# Fidele Portfolio: Documentation

A guide to how the site is built and how to change every part of it yourself.

---

## 1. Folder structure

```
portfolio/
├── index.html          ← the page skeleton (sections, text you rarely change)
├── css/
│   └── style.css       ← all colours, sizes, layouts, animations
├── js/
│   ├── data.js         ← YOUR CONTENT: skills, projects, roles, socials, stats
│   └── main.js         ← the behaviour: builds the page from data.js, runs animations
├── images/
│   ├── fidele.webp     ← your photo, transparent cutout (About section)
│   ├── favicon.svg     ← browser tab icon (yellow F, edit or replace)
│   ├── imigongo.svg          ← Rwandan border tile (horizontal, repeats sideways)
│   ├── imigongo-vertical.svg ← same tile turned 90° (phone menu strip)
│   └── (project screenshots)
└── DOCUMENTATION.md
```

**Rule of thumb**

| I want to change...                       | Open this file        |
|-------------------------------------------|-----------------------|
| Skills, projects, roles, socials, numbers | `js/data.js`          |
| Name, about text, contact details         | `index.html`          |
| Colours, fonts, sizes, animation speed    | `css/style.css`       |
| How something behaves                     | `js/main.js`          |

To run it, open `index.html` in a browser. No installation is needed. After every edit, save the file and refresh the browser (Ctrl+R).

---

## 2. How the page works (the big picture)

1. The browser loads `index.html` and reads the empty containers (for example `<div id="skills-grid"></div>`).
2. `data.js` creates one variable, `PORTFOLIO`, holding your content.
3. `main.js` loops over that data and writes HTML into the containers (`buildSkills()`, `buildProjects()` and so on).
4. `style.css` makes everything look good. Elements with `data-a="..."` start hidden.
5. When you scroll, `main.js` adds the class `in` to those elements and the CSS animates them into view.

Because of step 3, **adding a skill or project never requires touching HTML or CSS**.

---

## 3. Everyday edits

### 3.1 Change your name
- `index.html`: search for `Fidele` (the hero `<h1>`, the loader, the logo, the footer, the page `<title>`).
- The big letter in the circle is `<div class="orb__core">F</div>`. Change the letter, or put an `<img>` in there.

### 3.2 Add or remove hero roles (the sliding text)
`data.js` → `roles`:
```js
roles: [
  "Web Developer",
  "Embedded Systems Engineer",
  "Cybersecurity Student"   // ← just add a line
],
```

### 3.3 Social links
`data.js` → `socials`. Available icons: `instagram`, `facebook`, `email`, `github`, `linkedin`, `x`, `whatsapp`.
```js
{ name: "GitHub", icon: "github", url: "https://github.com/yourname" },
```
To add a **new icon**, paste its SVG path into the `ICONS` object at the top of `main.js` (24×24 viewBox) and use its key.

### 3.4 Your photo
`images/fidele.webp` is a **transparent cutout** (960×1380, so it stays sharp on phones) of you (background removed, with a soft yellow rim light). The CSS places it on a glowing disc so your head and shoulders pop out above the ring, with a small imigongo strip at the base.

To use another photo: remove its background (remove.bg or similar), save it as a PNG or WebP with transparency (and set the file name in `index.html`), a portrait crop with a little room above the head, at least 480×690px, and replace `images/fidele.webp`. The look is controlled in CSS section 9: `.about__disc` (the disc), `.about__frame img` (size and glow), `.about__spark` (the small star). A normal photo with a background also works. Remove `.about__disc` in `index.html` to drop the disc.

### 3.5 About text and numbers
- Text: edit the `<h3>` and `<p>` inside `.about__text` in `index.html`.
- Counters: `data.js` → `stats` (`value` is the number, `label` is the caption). Add as many as you like.

### 3.6 Skills
`data.js` → `skillGroups`.

**Add a skill to an existing card.** Copy one line inside `items`:
```js
{ name: "React", level: 60 },     // level = 0 to 100
```

**Add a new card:**
```js
{
  title: "Design",
  items: [
    { name: "Figma", level: 70 },
    { name: "Photoshop", level: 55 }
  ]
},
```
The grid reflows automatically (three across on desktop, one column on phones). Pills such as "Git" or "Linux" live in `tags`.

### 3.7 Projects
`data.js` → `projects`. Copy a block, paste it, edit it:
```js
{
  title: "My New App",
  category: "Programming",          // a filter button is auto-created per category
  image: "images/my-new-app.png",   // optional ("" gives a letter placeholder)
  description: "One short sentence.",
  link: "https://example.com"       // optional ("" hides the link)
},
```
- Use the same spelling for the same category (`"Web development"` ≠ `"Web Development"`).
- The newest project can go first, since the order in the file is the order on the page.
- Screenshot tip: use a 16:10 image around 800×500px, in `.jpg` or `.webp` to stay light.

### 3.7b Contact details
`index.html`, section 7 (`.contact__info`). Edit the text, the `mailto:` and the `tel:` links.

### 3.7c Where form messages go
`data.js` → `email`. When a visitor clicks **Send message**, their mail app opens with your address, a subject and their message already filled in, so they only press Send. Their text is also copied to the clipboard, and a "send it with Gmail" link appears in case they have no mail app. No server or account is needed.

---

## 4. Changing the look (`css/style.css`)

### 4.1 Colours and fonts
All of them are at the top, in `:root`:
```css
--accent: #fccb06;   /* yellow, used for highlights, glow, bars */
--bg:     #000;      /* page background */
--text:   #dcdcdc;
--card:   #161616;   /* cards, form fields */
```
The glow colours written as `#fccb06xx` (for example `#fccb0666`) are the accent plus transparency. If you change the accent, find and replace `fccb06` across the file so the glows match.

**Font:** change the family in the Google Fonts `<link>` in `index.html` and in `--font` in `style.css`.

### 4.2 Spacing and width
- `--side-pad`: left and right space of every section.
- `--max-width`: widest the content can grow.
- `.section { padding: 110px ... }`: vertical space between sections.

### 4.3 Sizes that adapt automatically
`clamp(min, ideal, max)` is used for the big text, for example `clamp(2.8rem, 8vw, 6.2rem)`. The text is never smaller than 2.8rem or bigger than 6.2rem, and in between it follows the screen width.

---

## 5. Animation reference

### 5.1 Scroll-reveal animations (the main system)
Add `data-a="..."` to any element in `index.html`:

| Value    | Effect                |
|----------|-----------------------|
| `up`     | rises from below      |
| `left`   | slides in from left   |
| `right`  | slides in from right  |
| `zoom`   | grows from 85% size   |

Stagger with a delay:
```html
<div data-a="up" style="--d:.3s">…</div>
```
- **Speed:** edit `transition: opacity .9s ..., transform .9s ...` in `[data-a]` (CSS section 3).
- **Distance:** change `50px` or `70px` in `[data-a="up"]` and the others.
- **New direction:**
  ```css
  [data-a="down"] { transform: translateY(-50px); }
  ```
  then use `data-a="down"`.
- **Trigger point:** in `initReveal()` in `main.js`, `threshold: 0.2` means "when 20% is visible". Use `0.5` for later and `0` for earlier.
- Generated cards (skills, projects) get their animation from `main.js`. The stagger is `i * 0.15` for skills and `(i % 3) * 0.1` for projects.
- After an element finishes animating, `data-a` is removed so hover effects aren't delayed. This is intended.

### 5.2 Every animation in the site

| Animation | Where | How to tweak |
|---|---|---|
| **Loader** (yellow fill of "FIDELE") | CSS 4: `loader-fill` | Duration `1.4s`. The loader disappears after `1500` ms in `initLoader()` (`main.js`). |
| **Scroll progress bar** | `#progress`, `initNav()` | Height `3px` in `.progress`. |
| **Nav background on scroll** | `.nav.solid` | Opacity digits in `#000000cc`. Trigger is `y > 40`. |
| **Nav active link / underline** | `.nav__links a::after` | Underline `height`, and `y + 200` offset in `initNav()`. |
| **Hero entrance** | `data-a` + `--d` in `index.html` | Edit the delays: `.15s, .3s, .45s…`. |
| **Role slider** | `initRoleSlider()` + `.hero__role` | Time between slides is `2600` ms. Slide speed is `.6s` in `.hero__role-track`. Keep `1.8em` equal in CSS (two places) and JS. |
| **Orb pulse** | `orb-pulse` | Duration `3.5s`. Glow size in the `box-shadow` values. |
| **Rotating rings** | `.orb__ring`, `spin` | `24s` / `38s` is one rotation. Smaller means faster. `animation-direction: reverse` flips the direction. |
| **Floating shapes** (2) | `.shape`, `float` | Bob height `-14px`, speed `5s`, offset with `animation-delay`. Position with `left/top` (see 5.3). |
| **Mouse parallax** | `initParallax()` | `strength = 30`. Larger means more movement. Set it to `0` to switch it off. |
| **Scroll hint** | `drip` | Duration `1.8s`. |
| **Skill bars** | `.skill__track i` | Fill time `1.4s`. The percentage comes from `level` in `data.js`. |
| **Number counters** | `countUp()` | About 0.8s (`40` steps × `20` ms). |
| **Skill card hover** | `.skill-card:hover` | Lift `-6px`, border becomes yellow. |
| **Project hover** | `.project__info` | Starts `45px` down and slides up. Touch screens always show it. |
| **Project filter** | `buildProjects()` | Toggles the `is-hidden` class. |
| **About photo frame** | `.about__photo::before` | Offset `18px`, moves to `8px` on hover. |
| **Buttons** | `.btn:hover` | Lift `-3px` and yellow glow. |
| **Back-to-top** | `.to-top.show` | Appears after `y > 600` in `initNav()`. |
| **Mobile menu** | `.nav__links` (≤860px) | Slides via `translate`, speed `.5s`. |

**Disable one effect.** Comment out its call in the INIT section at the bottom of `main.js`:
```js
// initParallax();
```

### 5.3 Customising the floating shapes
There are two shapes (a diamond and target rings). Each is a small `<svg>` in `index.html`, inside `.orb`:
```html
<div class="shape shape--1">
  <svg viewBox="0 0 24 24"> …your drawing… </svg>
</div>
```
Draw on a 24×24 grid. Use `currentColor` for stroke or fill so the CSS `color: var(--accent)` applies.

**Position:** `left` and `top` in `style.css` are the *centre* of the shape as a percentage of the orb box. They are placed on the dashed ring, like satellites. A point on the ring at angle A (degrees, 0° = right, 90° = down) is:
```
left = 50 + 45 × cos(A)      top = 50 + 45 × sin(A)
```
For example, 135° gives about `left: 15%; top: 85%` (lower-left, using 49 instead of 45 to sit just outside the ring). **Size** is the `--s` variable on each shape.

To add a third shape, copy one `.shape` block, name it `shape--3` and add a position line:
```css
.shape--3 { left: 82%; top: 18%; animation-delay: -4s; }
```

### 5.4 Imigongo border
The pattern is `images/imigongo.svg`, traced from a real imigongo border: separate diagonal strokes (not one continuous zigzag), with a solid triangle in every V and inverted V. It is a 48×17 tile with a transparent background, so it takes the black page colour. CSS repeats it sideways (`repeat-x`).
- **Where it is:** the bottom of the footer (`.imigongo` in `index.html` and CSS section 13), and as a vertical strip on the left edge of the phone menu (`.nav__links::before` in CSS section 14).
- **Height:** `--band-h: 28px` in `.imigongo`. The tile scales with it.
- **Use it somewhere else:** add `<div class="imigongo" aria-hidden="true"></div>` anywhere, for example under the hero or between sections.
- **Colour:** the yellow is written as `#fccb06` inside both SVG files. Open them in a text editor and replace it to recolour the pattern.

---

## 6. Responsiveness

Everything is mobile-ready through three tools:

1. **Fluid sizes**: `clamp()` for text and padding.
2. **Auto grids**: `repeat(auto-fit, minmax(280px, 1fr))` lets cards wrap with no media query.
3. **Breakpoints** (CSS section 14):

| Width    | What changes |
|----------|--------------|
| ≤ 860px  | Hero, About and Contact become one column. Orb moves above the text. Nav becomes a slide-in menu. |
| ≤ 480px  | Smaller section padding and smaller floating shapes. |
| touch devices | Project info is always visible, because there is no hover. |

To test it, press F12 in Chrome, then Ctrl+Shift+M for device mode.

---

## 7. Adding a whole new section

1. In `index.html`, copy an existing section as a base:
   ```html
   <section class="section" id="services">
     <h2 class="section__title" data-bg="Services" data-a="up">Services</h2>
     <div id="services-grid"></div>
   </section>
   ```
2. Add its nav link: `<a href="#services">Services</a>`. The active-link highlight works automatically.
3. Put the content in `data.js` and write a `buildServices()` function in `main.js` (copy `buildSkills()` as a template). Call it in the INIT section.
4. Style it in `style.css`, reusing `.skill-card` or `.project` where possible.

---

## 8. Publishing (free)

**GitHub Pages**
1. Create a repository and upload the whole `portfolio` folder contents. `index.html` must be at the top level.
2. Settings → Pages → Branch `main` → Save.
3. Your site is at `https://yourname.github.io/repository-name/`.

Other free options are Netlify (drag and drop the folder) and Vercel.

**Before publishing**
- Compress your images (squoosh.app) so the site loads fast on mobile data.
- Replace placeholder skill levels and about text with true information.
- Update the `<meta name="description">` and `<title>` in `index.html`.

---

## 9. Troubleshooting

| Problem | Likely cause |
|---|---|
| Page is blank apart from the nav | A typo in `data.js` (missing comma, quote or bracket). Press F12 → Console to see which line. |
| Skills or projects don't appear | `data.js` must load **before** `main.js` in `index.html`. Don't swap those two lines. |
| Project has no image | The path in `image:` is wrong. It is case-sensitive and relative to `index.html`. |
| Photo doesn't show | File must be exactly `images/fidele.webp` (lowercase). |
| Changes don't appear | Hard refresh with Ctrl+Shift+R. |
| Role slider text is cut off | `1.8em` in the CSS and in `initRoleSlider()` no longer match. |
| Nothing happens when sending the form | The visitor's device has no default mail app. They can paste the copied text or use the Gmail link shown under the form. To send without a mail app, connect Formspree or EmailJS inside `initForm()` in `main.js`. |

---

## 10. Quick-edit cheat sheet

```
New skill      → data.js  → skillGroups → items
New project    → data.js  → projects
New role line  → data.js  → roles
New social     → data.js  → socials
Change colour  → style.css → :root
Slower anim    → style.css → search the animation name, raise the seconds
Photo          → images/fidele.webp
```
