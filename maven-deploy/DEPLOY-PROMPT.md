# Deploy Pacifist Invaders to maven-company.com

Use the `/deploy-to-maven-company` skill to deploy the Pacifist Invaders game to maven-company.com. Here are all the details:

## App Details

- **App name:** Pacifist Invaders
- **URL slug:** pacifist-invaders (filename: `pacifist_invaders.html`)
- **Description:** Guilt Trip on Demand
- **Accent color:** purple-500
- **Icon:** Use the rocket/gaming icon: `M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.37m5.96 6l-2.46 2.46a2 2 0 01-2.83 0L8.58 15.1a2 2 0 010-2.83l2.46-2.46m5.96 6l1.7-1.7a2 2 0 000-2.83l-6.88-6.88a2 2 0 00-2.83 0L7.29 6m5.96 6L7.29 6M4.22 9.63a6 6 0 017.38-5.84m-4.55 12.3l-1.72 1.72a2 2 0 01-2.83 0l-.17-.17a2 2 0 010-2.83l1.72-1.72` or alternatively a simpler game controller: `M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z`

## The Complete HTML Template

Create the file `app/templates/pacifist_invaders.html` with the following content. This is a Space Invaders game where the aliens are pacifists who never shoot. When the player shoots them, they melodramatically crash to earth while other invaders show speech bubbles saying things like "YOU SHOT HIM!!" and tiny people walk in from the sides asking "What did you DO?!".

The template already includes:
- The `← Portal` back button (required by the skill)
- Inter font from Google Fonts CDN
- Full viewport, responsive, mobile touch controls
- 70s retro sound effects via Web Audio API
- Self-contained (no external dependencies beyond fonts)

```html
[PASTE THE CONTENTS OF pacifist_invaders.html HERE]
```

## Flask Route

Add this to `app/routes/pages.py` BEFORE the CRM catch-all route:

```python
@bp.route("/pacifist-invaders/")
def pacifist_invaders():
    return render_template("pacifist_invaders.html")
```

## Portal Tile

Add this to `app/templates/portal.html` inside the App Grid div:

```html
<!-- Pacifist Invaders -->
<a href="/pacifist-invaders/" class="group bg-white rounded-xl border-2 border-neutral-200 p-6 hover:border-maven-black hover:shadow-xl transition-all duration-200">
    <div class="w-12 h-12 bg-maven-black rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500 transition-colors">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
    </div>
    <h2 class="text-lg font-black text-maven-black uppercase tracking-tight group-hover:text-purple-500 transition-colors">Pacifist Invaders</h2>
    <p class="text-sm text-neutral-500 mt-1">Guilt Trip on Demand</p>
</a>
```

## Commit

```bash
git add app/templates/pacifist_invaders.html app/routes/pages.py app/templates/portal.html
git commit -m "Nieuwe app: Pacifist Invaders

Space Invaders game met een twist - de aliens zijn pacifisten die nooit schieten. Guilt trip on demand.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push origin main
```

The app will be live at `https://maven-company.com/pacifist-invaders/` within ~2 minutes.
