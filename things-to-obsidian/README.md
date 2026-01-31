# Things 3 to Obsidian Migration Tool

Export your [Things 3](https://culturedcode.com/things/) database by Cultured Code and import it into [Obsidian](https://obsidian.md/) with complete field mapping, folder structure, and smart filters.

## Features

- **Complete Data Export**: Tasks, projects, areas, tags, checklists, notes, dates
- **Folder Structure**: Mirrors your Things 3 hierarchy (Areas → Projects → Headings)
- **YAML Frontmatter**: All metadata preserved for Dataview queries
- **Smart Views**: Pre-built Dataview queries for Today, Upcoming, Anytime, Someday, Logbook
- **Tag Preservation**: All Things 3 tags converted to Obsidian tags
- **Checklist Conversion**: Things checklists become markdown checkboxes
- **Completed Items**: Optionally include/exclude completed and canceled items

## Things 3 → Obsidian Mapping

| Things 3 | Obsidian |
|----------|----------|
| Areas | Top-level folders with `_index.md` |
| Projects | Subfolders with `_index.md` |
| Headings | Subfolders within projects |
| Tasks/To-dos | Individual `.md` files |
| Tags | YAML frontmatter `tags` |
| Notes | File body content |
| Checklists | `- [ ]` / `- [x]` markdown |
| Start Date | `start_date` frontmatter |
| Deadline | `deadline` frontmatter |
| Inbox | `Inbox/` folder |
| Today/Upcoming/etc | Dataview queries in `_views/` |
| Logbook | `Logbook/` folder + Dataview query |

## Installation

### Requirements

- macOS (Things 3 is macOS/iOS only)
- Python 3.8+
- Things 3 installed with data

### Setup

```bash
# Clone or download this tool
cd things-to-obsidian

# No dependencies needed for basic usage
# Optional: Install things.py for alternative reading method
pip install things.py
```

## Usage

### Basic Export

```bash
# Export to default location (./things-obsidian-vault)
python things_to_obsidian.py

# Export to specific location
python things_to_obsidian.py --output ~/Documents/MyObsidianVault

# Export to existing Obsidian vault (creates Things subfolder)
python things_to_obsidian.py --output ~/Documents/MyVault/Things
```

### Options

```bash
python things_to_obsidian.py --help

Options:
  -o, --output PATH      Output path for Obsidian vault
  -d, --database PATH    Path to Things 3 database (auto-detected)
  --no-completed         Exclude completed and canceled items
  --include-trash        Include trashed items
  --use-thingspy         Use things.py library instead of direct DB access
```

### Examples

```bash
# Export only active items
python things_to_obsidian.py --no-completed

# Include trashed items for recovery
python things_to_obsidian.py --include-trash

# Use things.py library (requires: pip install things.py)
python things_to_obsidian.py --use-thingspy
```

## Output Structure

```
things-obsidian-vault/
├── _views/                    # Smart list Dataview queries
│   ├── Today.md
│   ├── Upcoming.md
│   ├── Anytime.md
│   ├── Someday.md
│   ├── All Projects.md
│   ├── Deadlines.md
│   └── Logbook.md
├── Inbox/                     # Inbox items
│   └── *.md
├── Logbook/                   # Completed items without area/project
│   └── *.md
├── [Area Name]/               # Each area becomes a folder
│   ├── _index.md              # Area overview
│   ├── [Project Name]/        # Projects as subfolders
│   │   ├── _index.md          # Project overview with task list
│   │   ├── [Heading Name]/    # Headings as subfolders
│   │   │   └── *.md           # Tasks
│   │   └── *.md               # Tasks without heading
│   └── *.md                   # Tasks directly in area
└── [Project Name]/            # Projects without area
    └── ...
```

## Task File Format

Each task is exported as a markdown file with YAML frontmatter:

```markdown
---
title: "Buy groceries"
type: to-do
status: incomplete
tags: ["errands", "weekly"]
area: "Personal"
project: "Home"
list: Anytime
start_date: 2025-01-20
deadline: 2025-01-25
created: 2025-01-15T10:30:00
things_uuid: ABC123...
---

# Buy groceries

**Deadline:** 2025-01-25

## Notes

Remember to check the pantry first.

## Checklist

- [x] Milk
- [x] Eggs
- [ ] Bread
- [ ] Vegetables
```

## Recommended Obsidian Plugins

For the best experience, install these community plugins:

1. **[Dataview](https://github.com/blacksmithgu/obsidian-dataview)** (Essential)
   - Powers the smart views (Today, Upcoming, etc.)
   - Query your tasks by any field

2. **[Tasks](https://github.com/obsidian-tasks-group/obsidian-tasks)**
   - Checkbox task management
   - Due date handling

3. **[Calendar](https://github.com/liamcain/obsidian-calendar-plugin)**
   - Visualize tasks by date

4. **[Kanban](https://github.com/mgmeyers/obsidian-kanban)**
   - Project board views

## Dataview Queries

The `_views/` folder contains pre-built queries. Here are additional useful queries:

### Tasks Due This Week
```dataview
TABLE deadline, project
FROM ""
WHERE type = "to-do" AND status = "incomplete"
AND deadline >= date(today) AND deadline <= date(today) + dur(7 days)
SORT deadline ASC
```

### Tasks by Tag
```dataview
TABLE project, deadline
FROM #your-tag
WHERE type = "to-do" AND status = "incomplete"
```

### Recently Completed
```dataview
TABLE completed_date, project
FROM ""
WHERE status = "completed"
SORT completed_date DESC
LIMIT 20
```

## Database Location

The script auto-detects your Things 3 database. If it fails, the database is typically at:

```
~/Library/Group Containers/JLMPQHK86H.com.culturedcode.ThingsMac/Things Database.thingsdatabase/main.sqlite
```

Or with ThingsData subfolder:
```
~/Library/Group Containers/JLMPQHK86H.com.culturedcode.ThingsMac/ThingsData-XXXXX/Things Database.thingsdatabase/main.sqlite
```

## Troubleshooting

### "Could not find Things 3 database"

1. Make sure Things 3 is installed and has been opened at least once
2. Check the database location manually (see above)
3. Specify the path explicitly: `--database /path/to/main.sqlite`

### "Permission denied"

Grant Terminal/Python full disk access:
1. System Preferences → Security & Privacy → Privacy → Full Disk Access
2. Add Terminal.app or your Python interpreter

### Empty export

- Check if Things 3 has data
- Try `--include-trash` to see if items were trashed
- Use `--use-thingspy` for alternative reading method

## License

MIT License - Feel free to modify and distribute.

## Credits

- [Things 3](https://culturedcode.com/things/) by Cultured Code
- [things.py](https://github.com/thingsapi/things.py) library by Alexander Willner
- Database schema research from [things.sh](https://github.com/AlexanderWillner/things.sh)
