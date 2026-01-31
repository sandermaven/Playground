#!/usr/bin/env python3
"""
Things 3 to Obsidian Migration Tool

Exports your Things 3 database and creates an Obsidian vault with:
- Complete folder structure matching Areas and Projects
- All tasks as individual markdown files with YAML frontmatter
- Tags preserved as Obsidian tags
- Checklists converted to markdown checkboxes
- Dataview-compatible queries for smart lists (Today, Upcoming, etc.)

Requirements:
    pip install things.py

Usage:
    python things_to_obsidian.py [--output /path/to/obsidian/vault]
"""

import os
import re
import json
import sqlite3
import argparse
from datetime import datetime, date
from pathlib import Path
from typing import Optional, Dict, List, Any
from dataclasses import dataclass, field

# Try to import things.py library
try:
    import things
    THINGS_PY_AVAILABLE = True
except ImportError:
    THINGS_PY_AVAILABLE = False


@dataclass
class ThingsItem:
    """Represents a Things 3 item (task, project, or heading)"""
    uuid: str
    title: str
    type: str  # 'to-do', 'project', 'heading'
    status: str  # 'incomplete', 'completed', 'canceled'
    notes: str = ""
    tags: List[str] = field(default_factory=list)
    checklist: List[Dict] = field(default_factory=list)
    area: Optional[str] = None
    area_title: Optional[str] = None
    project: Optional[str] = None
    project_title: Optional[str] = None
    heading: Optional[str] = None
    heading_title: Optional[str] = None
    start_date: Optional[str] = None
    deadline: Optional[str] = None
    stop_date: Optional[str] = None  # completion/cancellation date
    start: Optional[str] = None  # 'Inbox', 'Anytime', 'Someday'
    index: int = 0
    created: Optional[str] = None
    modified: Optional[str] = None
    trashed: bool = False


@dataclass
class Area:
    """Represents a Things 3 Area"""
    uuid: str
    title: str
    tags: List[str] = field(default_factory=list)


class Things3Reader:
    """Reads data from Things 3 database"""

    def __init__(self, db_path: Optional[str] = None):
        self.db_path = db_path or self._find_database()
        self.areas: Dict[str, Area] = {}
        self.projects: Dict[str, ThingsItem] = {}
        self.headings: Dict[str, ThingsItem] = {}
        self.tasks: List[ThingsItem] = []
        self.tags: Dict[str, str] = {}  # uuid -> title

    def _find_database(self) -> str:
        """Find the Things 3 database location"""
        home = Path.home()

        # Primary location (Things 3.x)
        primary = home / "Library/Group Containers/JLMPQHK86H.com.culturedcode.ThingsMac"
        if primary.exists():
            # Find the ThingsData folder
            for item in primary.iterdir():
                if item.name.startswith("ThingsData-"):
                    db_file = item / "Things Database.thingsdatabase" / "main.sqlite"
                    if db_file.exists():
                        return str(db_file)
            # Try direct path
            db_file = primary / "Things Database.thingsdatabase" / "main.sqlite"
            if db_file.exists():
                return str(db_file)

        # Beta location
        beta = home / "Library/Group Containers/JLMPQHK86H.com.culturedcode.ThingsMac.beta"
        if beta.exists():
            db_file = beta / "Things Database.thingsdatabase" / "main.sqlite"
            if db_file.exists():
                return str(db_file)

        # Legacy location
        legacy = home / "Library/Containers/com.culturedcode.ThingsMac/Data/Library/Application Support/Cultured Code/Things/Things.sqlite3"
        if legacy.exists():
            return str(legacy)

        raise FileNotFoundError(
            "Could not find Things 3 database. Please specify path with --database option.\n"
            "Common locations:\n"
            "  ~/Library/Group Containers/JLMPQHK86H.com.culturedcode.ThingsMac/Things Database.thingsdatabase/main.sqlite"
        )

    def _decode_things_date(self, date_int: Optional[int]) -> Optional[str]:
        """Decode Things 3 date format (bitmask) to ISO date string"""
        if date_int is None or date_int == 0:
            return None

        # Things uses a bitmask: year in bits 16-26, month in bits 12-15, day in bits 7-11
        try:
            year = (date_int >> 16) & 0x7FF
            month = (date_int >> 12) & 0xF
            day = (date_int >> 7) & 0x1F

            if year > 0 and 1 <= month <= 12 and 1 <= day <= 31:
                return f"{year:04d}-{month:02d}-{day:02d}"
        except:
            pass

        # Fallback: try as timestamp
        try:
            # Things uses Core Data timestamp (seconds since 2001-01-01)
            core_data_epoch = datetime(2001, 1, 1)
            dt = datetime.fromtimestamp(date_int + core_data_epoch.timestamp())
            return dt.strftime("%Y-%m-%d")
        except:
            pass

        return None

    def _timestamp_to_iso(self, ts: Optional[float]) -> Optional[str]:
        """Convert Core Data timestamp to ISO datetime string"""
        if ts is None or ts == 0:
            return None
        try:
            # Core Data epoch is 2001-01-01
            core_data_epoch = 978307200  # Unix timestamp for 2001-01-01
            dt = datetime.fromtimestamp(ts + core_data_epoch)
            return dt.isoformat()
        except:
            return None

    def read_all(self) -> None:
        """Read all data from Things 3 database"""
        print(f"Reading from: {self.db_path}")

        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        self._read_tags(cursor)
        self._read_areas(cursor)
        self._read_tasks(cursor)

        conn.close()

        print(f"Found: {len(self.areas)} areas, {len(self.projects)} projects, "
              f"{len(self.headings)} headings, {len(self.tasks)} tasks")

    def _read_tags(self, cursor: sqlite3.Cursor) -> None:
        """Read all tags"""
        cursor.execute("SELECT uuid, title FROM TMTag")
        for row in cursor.fetchall():
            self.tags[row['uuid']] = row['title']

    def _read_areas(self, cursor: sqlite3.Cursor) -> None:
        """Read all areas"""
        cursor.execute('SELECT uuid, title FROM TMArea ORDER BY "index"')
        for row in cursor.fetchall():
            area = Area(
                uuid=row['uuid'],
                title=row['title'],
                tags=[]
            )

            # Get area tags
            cursor.execute(
                "SELECT tags FROM TMAreaTag WHERE areas = ?",
                (row['uuid'],)
            )
            for tag_row in cursor.fetchall():
                if tag_row['tags'] in self.tags:
                    area.tags.append(self.tags[tag_row['tags']])

            self.areas[row['uuid']] = area

    def _read_tasks(self, cursor: sqlite3.Cursor) -> None:
        """Read all tasks, projects, and headings"""
        cursor.execute("""
            SELECT
                uuid, title, type, status, notes,
                area, project, actionGroup,
                startDate, dueDate, stopDate, start,
                trashed, "index",
                creationDate, userModificationDate
            FROM TMTask
            ORDER BY "index"
        """)

        type_map = {0: 'to-do', 1: 'project', 2: 'heading'}
        status_map = {0: 'incomplete', 2: 'canceled', 3: 'completed'}
        start_map = {0: 'Inbox', 1: 'Anytime', 2: 'Someday'}

        for row in cursor.fetchall():
            item_type = type_map.get(row['type'], 'to-do')

            item = ThingsItem(
                uuid=row['uuid'],
                title=row['title'] or "Untitled",
                type=item_type,
                status=status_map.get(row['status'], 'incomplete'),
                notes=row['notes'] or "",
                area=row['area'],
                project=row['project'],
                heading=row['actionGroup'],
                start_date=self._decode_things_date(row['startDate']),
                deadline=self._decode_things_date(row['dueDate']),
                stop_date=self._timestamp_to_iso(row['stopDate']),
                start=start_map.get(row['start']),
                trashed=bool(row['trashed']),
                index=row['index'] or 0,
                created=self._timestamp_to_iso(row['creationDate']),
                modified=self._timestamp_to_iso(row['userModificationDate'])
            )

            # Get tags for this item
            cursor.execute(
                "SELECT tags FROM TMTaskTag WHERE tasks = ?",
                (row['uuid'],)
            )
            for tag_row in cursor.fetchall():
                if tag_row['tags'] in self.tags:
                    item.tags.append(self.tags[tag_row['tags']])

            # Get checklist items
            cursor.execute("""
                SELECT uuid, title, status
                FROM TMChecklistItem
                WHERE task = ?
                ORDER BY "index"
            """, (row['uuid'],))
            for cl_row in cursor.fetchall():
                item.checklist.append({
                    'title': cl_row['title'],
                    'completed': cl_row['status'] == 3
                })

            # Store based on type
            if item_type == 'project':
                self.projects[item.uuid] = item
            elif item_type == 'heading':
                self.headings[item.uuid] = item
            else:
                self.tasks.append(item)

        # Resolve area/project/heading titles
        for item in self.tasks + list(self.projects.values()) + list(self.headings.values()):
            if item.area and item.area in self.areas:
                item.area_title = self.areas[item.area].title
            if item.project and item.project in self.projects:
                item.project_title = self.projects[item.project].title
            if item.heading and item.heading in self.headings:
                item.heading_title = self.headings[item.heading].title


class Things3ReaderPy:
    """Alternative reader using things.py library"""

    def __init__(self):
        self.areas: Dict[str, Area] = {}
        self.projects: Dict[str, ThingsItem] = {}
        self.headings: Dict[str, ThingsItem] = {}
        self.tasks: List[ThingsItem] = []
        self.tags: Dict[str, str] = {}

    def read_all(self) -> None:
        """Read all data using things.py"""
        print("Reading using things.py library...")

        # Read areas
        for area in things.areas():
            self.areas[area['uuid']] = Area(
                uuid=area['uuid'],
                title=area['title'],
                tags=area.get('tags', [])
            )

        # Read all projects
        for proj in things.projects(include_items=True):
            self.projects[proj['uuid']] = self._convert_item(proj, 'project')

        # Read all tasks (including completed)
        for task in things.tasks(include_items=True):
            item = self._convert_item(task, 'to-do')
            self.tasks.append(item)

        # Read completed items from logbook
        for task in things.logbook():
            if task['uuid'] not in [t.uuid for t in self.tasks]:
                item = self._convert_item(task, task.get('type', 'to-do'))
                if item.type == 'project':
                    self.projects[item.uuid] = item
                else:
                    self.tasks.append(item)

        print(f"Found: {len(self.areas)} areas, {len(self.projects)} projects, "
              f"{len(self.tasks)} tasks")

    def _convert_item(self, data: Dict, item_type: str) -> ThingsItem:
        """Convert things.py dict to ThingsItem"""
        return ThingsItem(
            uuid=data.get('uuid', ''),
            title=data.get('title', 'Untitled'),
            type=item_type,
            status=data.get('status', 'incomplete'),
            notes=data.get('notes', ''),
            tags=data.get('tags', []),
            checklist=[
                {'title': c.get('title', ''), 'completed': c.get('status') == 'completed'}
                for c in data.get('checklist', [])
            ],
            area=data.get('area'),
            area_title=data.get('area_title'),
            project=data.get('project'),
            project_title=data.get('project_title'),
            heading=data.get('heading'),
            heading_title=data.get('heading_title'),
            start_date=data.get('start_date'),
            deadline=data.get('deadline'),
            stop_date=data.get('stop_date'),
            start=data.get('start'),
            index=data.get('index', 0),
            created=data.get('created'),
            modified=data.get('modified'),
            trashed=data.get('trashed', False)
        )


class ObsidianExporter:
    """Exports Things 3 data to Obsidian vault structure"""

    def __init__(self, output_path: str, include_completed: bool = True,
                 include_trash: bool = False):
        self.output_path = Path(output_path)
        self.include_completed = include_completed
        self.include_trash = include_trash
        self.file_counter: Dict[str, int] = {}  # For handling duplicate names

    def sanitize_filename(self, name: str) -> str:
        """Convert name to valid filename"""
        # Remove or replace invalid characters
        name = re.sub(r'[<>:"/\\|?*]', '', name)
        name = re.sub(r'\s+', ' ', name).strip()
        name = name[:100]  # Limit length

        if not name:
            name = "Untitled"

        return name

    def get_unique_filename(self, folder: Path, base_name: str, ext: str = ".md") -> str:
        """Get unique filename, appending number if needed"""
        safe_name = self.sanitize_filename(base_name)
        filename = safe_name + ext
        counter = 1

        while (folder / filename).exists():
            filename = f"{safe_name} {counter}{ext}"
            counter += 1

        return filename

    def create_frontmatter(self, item: ThingsItem) -> str:
        """Create YAML frontmatter for item"""
        fm = ["---"]

        fm.append(f"title: \"{item.title.replace('\"', '\\'\"')}\"")
        fm.append(f"type: {item.type}")
        fm.append(f"status: {item.status}")

        if item.tags:
            tags_str = ", ".join(f'"{t}"' for t in item.tags)
            fm.append(f"tags: [{tags_str}]")

        if item.area_title:
            fm.append(f"area: \"{item.area_title}\"")
        if item.project_title:
            fm.append(f"project: \"{item.project_title}\"")
        if item.heading_title:
            fm.append(f"heading: \"{item.heading_title}\"")

        if item.start:
            fm.append(f"list: {item.start}")
        if item.start_date:
            fm.append(f"start_date: {item.start_date}")
        if item.deadline:
            fm.append(f"deadline: {item.deadline}")
        if item.stop_date:
            fm.append(f"completed_date: {item.stop_date[:10]}")

        if item.created:
            fm.append(f"created: {item.created}")
        if item.modified:
            fm.append(f"modified: {item.modified}")

        fm.append(f"things_uuid: {item.uuid}")
        fm.append("---")

        return "\n".join(fm)

    def create_task_content(self, item: ThingsItem) -> str:
        """Create markdown content for a task"""
        parts = [self.create_frontmatter(item), ""]

        # Title as H1
        parts.append(f"# {item.title}")
        parts.append("")

        # Status indicator
        if item.status == 'completed':
            parts.append("> [!success] Completed")
        elif item.status == 'canceled':
            parts.append("> [!warning] Canceled")
        parts.append("")

        # Dates section
        dates = []
        if item.start_date:
            dates.append(f"**Start:** {item.start_date}")
        if item.deadline:
            dates.append(f"**Deadline:** {item.deadline}")
        if dates:
            parts.extend(dates)
            parts.append("")

        # Notes
        if item.notes:
            parts.append("## Notes")
            parts.append("")
            parts.append(item.notes)
            parts.append("")

        # Checklist
        if item.checklist:
            parts.append("## Checklist")
            parts.append("")
            for cl_item in item.checklist:
                checkbox = "[x]" if cl_item['completed'] else "[ ]"
                parts.append(f"- {checkbox} {cl_item['title']}")
            parts.append("")

        return "\n".join(parts)

    def create_project_index(self, project: ThingsItem, tasks: List[ThingsItem]) -> str:
        """Create index note for a project"""
        parts = [self.create_frontmatter(project), ""]

        parts.append(f"# {project.title}")
        parts.append("")

        if project.status == 'completed':
            parts.append("> [!success] Project Completed")
            parts.append("")

        # Dates
        dates = []
        if project.start_date:
            dates.append(f"**Start:** {project.start_date}")
        if project.deadline:
            dates.append(f"**Deadline:** {project.deadline}")
        if dates:
            parts.extend(dates)
            parts.append("")

        # Notes
        if project.notes:
            parts.append("## Notes")
            parts.append("")
            parts.append(project.notes)
            parts.append("")

        # Task list (embedded query for Dataview)
        parts.append("## Tasks")
        parts.append("")
        parts.append("```dataview")
        parts.append("TABLE status, deadline, tags")
        parts.append(f'FROM "{project.title}"')
        parts.append("WHERE type = \"to-do\"")
        parts.append("SORT status ASC, deadline ASC")
        parts.append("```")
        parts.append("")

        # Simple task list fallback
        parts.append("### All Tasks")
        parts.append("")

        incomplete = [t for t in tasks if t.status == 'incomplete']
        completed = [t for t in tasks if t.status == 'completed']

        for task in incomplete:
            parts.append(f"- [ ] [[{self.sanitize_filename(task.title)}]]")
        for task in completed:
            parts.append(f"- [x] [[{self.sanitize_filename(task.title)}]]")

        parts.append("")

        return "\n".join(parts)

    def create_area_index(self, area: Area, projects: List[ThingsItem],
                          tasks: List[ThingsItem]) -> str:
        """Create index note for an area"""
        parts = ["---"]
        parts.append(f"title: \"{area.title}\"")
        parts.append("type: area")
        if area.tags:
            tags_str = ", ".join(f'"{t}"' for t in area.tags)
            parts.append(f"tags: [{tags_str}]")
        parts.append(f"things_uuid: {area.uuid}")
        parts.append("---")
        parts.append("")

        parts.append(f"# {area.title}")
        parts.append("")

        # Projects in this area
        if projects:
            parts.append("## Projects")
            parts.append("")
            for proj in projects:
                status = "" if proj.status == 'incomplete' else f" ({proj.status})"
                parts.append(f"- [[{self.sanitize_filename(proj.title)}/_index|{proj.title}]]{status}")
            parts.append("")

        # Loose tasks in this area
        loose_tasks = [t for t in tasks if not t.project]
        if loose_tasks:
            parts.append("## Tasks")
            parts.append("")
            for task in loose_tasks:
                checkbox = "[ ]" if task.status == 'incomplete' else "[x]"
                parts.append(f"- {checkbox} [[{self.sanitize_filename(task.title)}]]")
            parts.append("")

        return "\n".join(parts)

    def export(self, reader) -> None:
        """Export all data to Obsidian vault"""
        print(f"\nExporting to: {self.output_path}")

        # Create base directories
        self.output_path.mkdir(parents=True, exist_ok=True)

        # Create smart list folders
        (self.output_path / "_views").mkdir(exist_ok=True)
        (self.output_path / "Inbox").mkdir(exist_ok=True)
        (self.output_path / "Logbook").mkdir(exist_ok=True)

        # Track counts
        counts = {'areas': 0, 'projects': 0, 'tasks': 0}

        # Export areas
        for area_uuid, area in reader.areas.items():
            area_folder = self.output_path / self.sanitize_filename(area.title)
            area_folder.mkdir(exist_ok=True)

            # Get projects and tasks for this area
            area_projects = [p for p in reader.projects.values()
                           if p.area == area_uuid and (self.include_trash or not p.trashed)]
            area_tasks = [t for t in reader.tasks
                         if t.area == area_uuid and (self.include_trash or not t.trashed)]

            # Create area index
            index_content = self.create_area_index(area, area_projects, area_tasks)
            (area_folder / "_index.md").write_text(index_content)
            counts['areas'] += 1

            # Export projects in this area
            for project in area_projects:
                self._export_project(project, area_folder, reader, counts)

            # Export loose tasks in this area
            for task in area_tasks:
                if not task.project:
                    self._export_task(task, area_folder, counts)

        # Export projects without area
        no_area_projects = [p for p in reader.projects.values()
                          if not p.area and (self.include_trash or not p.trashed)]
        for project in no_area_projects:
            self._export_project(project, self.output_path, reader, counts)

        # Export tasks without area/project (Inbox items, etc.)
        loose_tasks = [t for t in reader.tasks
                      if not t.area and not t.project and (self.include_trash or not t.trashed)]

        for task in loose_tasks:
            if task.start == 'Inbox':
                folder = self.output_path / "Inbox"
            elif task.status in ('completed', 'canceled') and self.include_completed:
                folder = self.output_path / "Logbook"
            else:
                folder = self.output_path
            self._export_task(task, folder, counts)

        # Create smart views (Dataview queries)
        self._create_smart_views()

        print(f"\nExported: {counts['areas']} areas, {counts['projects']} projects, "
              f"{counts['tasks']} tasks")

    def _export_project(self, project: ThingsItem, parent_folder: Path,
                        reader, counts: Dict) -> None:
        """Export a project and its tasks"""
        if not self.include_completed and project.status != 'incomplete':
            return

        project_folder = parent_folder / self.sanitize_filename(project.title)
        project_folder.mkdir(exist_ok=True)

        # Get tasks for this project
        project_tasks = [t for t in reader.tasks
                        if t.project == project.uuid and (self.include_trash or not t.trashed)]

        # Create project index
        index_content = self.create_project_index(project, project_tasks)
        (project_folder / "_index.md").write_text(index_content)
        counts['projects'] += 1

        # Group tasks by heading
        headings: Dict[Optional[str], List[ThingsItem]] = {None: []}
        for task in project_tasks:
            heading_uuid = task.heading
            if heading_uuid not in headings:
                headings[heading_uuid] = []
            headings[heading_uuid].append(task)

        # Export tasks
        for heading_uuid, tasks in headings.items():
            if heading_uuid and heading_uuid in reader.headings:
                heading = reader.headings[heading_uuid]
                heading_folder = project_folder / self.sanitize_filename(heading.title)
                heading_folder.mkdir(exist_ok=True)
                target_folder = heading_folder
            else:
                target_folder = project_folder

            for task in tasks:
                self._export_task(task, target_folder, counts)

    def _export_task(self, task: ThingsItem, folder: Path, counts: Dict) -> None:
        """Export a single task"""
        if not self.include_completed and task.status != 'incomplete':
            return

        filename = self.get_unique_filename(folder, task.title)
        content = self.create_task_content(task)
        (folder / filename).write_text(content)
        counts['tasks'] += 1

    def _create_smart_views(self) -> None:
        """Create Dataview query files for smart lists"""
        views_folder = self.output_path / "_views"

        # Today view
        today_content = """---
title: Today
---

# Today

Tasks scheduled for today or overdue.

```dataview
TABLE deadline, project, tags
FROM ""
WHERE type = "to-do" AND status = "incomplete"
AND (start_date = date(today) OR deadline <= date(today))
SORT deadline ASC
```
"""
        (views_folder / "Today.md").write_text(today_content)

        # Upcoming view
        upcoming_content = """---
title: Upcoming
---

# Upcoming

Tasks with upcoming start dates or deadlines.

```dataview
TABLE start_date, deadline, project, tags
FROM ""
WHERE type = "to-do" AND status = "incomplete"
AND (start_date > date(today) OR deadline > date(today))
SORT start_date ASC, deadline ASC
```
"""
        (views_folder / "Upcoming.md").write_text(upcoming_content)

        # Anytime view
        anytime_content = """---
title: Anytime
---

# Anytime

Tasks available to work on anytime.

```dataview
TABLE project, deadline, tags
FROM ""
WHERE type = "to-do" AND status = "incomplete" AND list = "Anytime"
SORT deadline ASC
```
"""
        (views_folder / "Anytime.md").write_text(anytime_content)

        # Someday view
        someday_content = """---
title: Someday
---

# Someday

Tasks saved for someday.

```dataview
TABLE project, tags
FROM ""
WHERE type = "to-do" AND status = "incomplete" AND list = "Someday"
SORT project ASC
```
"""
        (views_folder / "Someday.md").write_text(someday_content)

        # All Projects view
        projects_content = """---
title: All Projects
---

# All Projects

```dataview
TABLE status, area, deadline, tags
FROM ""
WHERE type = "project"
SORT status ASC, deadline ASC
```
"""
        (views_folder / "All Projects.md").write_text(projects_content)

        # Deadlines view
        deadlines_content = """---
title: Deadlines
---

# Upcoming Deadlines

```dataview
TABLE deadline, project, status
FROM ""
WHERE deadline != null AND status = "incomplete"
SORT deadline ASC
```
"""
        (views_folder / "Deadlines.md").write_text(deadlines_content)

        # Logbook view
        logbook_content = """---
title: Logbook
---

# Completed Tasks

```dataview
TABLE completed_date, project, type
FROM ""
WHERE status = "completed"
SORT completed_date DESC
LIMIT 100
```
"""
        (views_folder / "Logbook.md").write_text(logbook_content)


def main():
    parser = argparse.ArgumentParser(
        description="Export Things 3 database to Obsidian vault"
    )
    parser.add_argument(
        "-o", "--output",
        default="./things-obsidian-vault",
        help="Output path for Obsidian vault (default: ./things-obsidian-vault)"
    )
    parser.add_argument(
        "-d", "--database",
        help="Path to Things 3 database (auto-detected if not specified)"
    )
    parser.add_argument(
        "--no-completed",
        action="store_true",
        help="Exclude completed and canceled items"
    )
    parser.add_argument(
        "--include-trash",
        action="store_true",
        help="Include trashed items"
    )
    parser.add_argument(
        "--use-thingspy",
        action="store_true",
        help="Use things.py library instead of direct database access"
    )

    args = parser.parse_args()

    # Choose reader
    if args.use_thingspy:
        if not THINGS_PY_AVAILABLE:
            print("Error: things.py not installed. Run: pip install things.py")
            return 1
        reader = Things3ReaderPy()
    else:
        reader = Things3Reader(args.database)

    # Read data
    try:
        reader.read_all()
    except FileNotFoundError as e:
        print(f"Error: {e}")
        return 1
    except Exception as e:
        print(f"Error reading database: {e}")
        return 1

    # Export to Obsidian
    exporter = ObsidianExporter(
        args.output,
        include_completed=not args.no_completed,
        include_trash=args.include_trash
    )
    exporter.export(reader)

    print(f"\nDone! Open '{args.output}' as a vault in Obsidian.")
    print("\nRecommended Obsidian plugins:")
    print("  - Dataview (for smart views/filters)")
    print("  - Tasks (for checkbox management)")
    print("  - Calendar (for date visualization)")

    return 0


if __name__ == "__main__":
    exit(main())
