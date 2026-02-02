# Single-Shot Website Skill

Build websites and provide instant preview URLs via GitHub Pages HTMLPreview.

## Trigger

Use this skill when the user wants to:
- Create a website or landing page
- Build a portfolio site
- Make a web app
- Create any HTML-based project with an immediate working preview

**Example requests:** "build me a website", "create a landing page", "make a portfolio site", "build a web app"

## Initial Response

When triggered, respond with: "Please tell me what website you would like me to build?"

Wait for the user's briefing before proceeding.

## Workflow

1. Create website files in an aptly named directory:
   - `index.html` - Main HTML file
   - `styles.css` - Stylesheet (if needed)
   - `script.js` - JavaScript (if needed)

2. Stage and commit:
   ```bash
   git add . && git commit -m "feat: add <website-name> website"
   ```

3. Push to branch:
   ```bash
   git push -u origin <branch-name>
   ```

4. Return preview URL as a clickable link:
   ```
   https://htmlpreview.github.io/?https://github.com/[owner]/[repo]/blob/[branch]/[path]/index.html
   ```

## Stack Selection

| Request Type | Stack |
|--------------|-------|
| Simple/static site | Vanilla HTML/CSS/JS |
| Interactive app | Vanilla HTML/CSS/JS (single file preferred) |
| Portfolio/landing | HTML/CSS with modern design |

## Images

Use placeholder services for images:

```html
<!-- Random image -->
<img src="https://picsum.photos/800/400" alt="Hero image">

<!-- Consistent image (same seed = same image) -->
<img src="https://picsum.photos/seed/unique-id/600/400" alt="Consistent image">
```

## Functionality Standards

- **Real data:** Use real data where possible (actual addresses, GPS coordinates, real business names)
- **Browser APIs:** Integrate browser APIs when relevant: Geolocation, LocalStorage, Share API
- **Working links:** Add working navigation links (Google Maps, Apple Maps)
- **No mocks:** No mock/placeholder data for interactive features
- **Mobile-first:** Touch-friendly UI, responsive design

## Common Integrations

| Feature | Implementation |
|---------|----------------|
| Location-based | Browser Geolocation API + Haversine formula |
| Maps/Navigation | Google Maps links with coordinates |
| Weather | Open-Meteo API (no key required) |
| Date/Time | Native JS Date with locale formatting |

## Quality Checklist

Before delivering, verify:

- [ ] Interactive features actually work (not just UI mockups)
- [ ] Real data used where applicable (coordinates, addresses)
- [ ] Mobile responsive design
- [ ] Graceful fallbacks when APIs fail
- [ ] Preview URL tested and working

## Directory Structure

Place websites in the appropriate location based on purpose:

```
Playground/
├── prototypes/           # For prototype websites
│   └── my-landing-page/
│       ├── index.html
│       ├── styles.css
│       └── script.js
├── experiments/          # For experimental web projects
│   └── interactive-demo/
│       └── index.html    # Single-file preferred for experiments
```

## Example Preview URL

For a website at `prototypes/my-site/index.html` on branch `claude/website-abc123`:

```
https://htmlpreview.github.io/?https://github.com/sandermaven/Playground/blob/claude/website-abc123/prototypes/my-site/index.html
```
