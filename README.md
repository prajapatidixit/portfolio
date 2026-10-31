# Dixit Prajapati — Portfolio (Angular)

Angular 18+ standalone-component port of the React/Framer Motion landing page.

## Setup
```bash
ng new dixit-portfolio --style=css --ssr=false --routing=false
cd dixit-portfolio
npm i -D tailwindcss@3.4 postcss autoprefixer
```
Then copy into the project, replacing existing files:
- `tailwind.config.js` and `.postcssrc.json` → project root
- `src/` contents → `src/` (index.html, styles.css, main.ts, app/…)

Run `ng serve`.

## Mapping from the React version
| React | Angular |
|---|---|
| `FadeIn` (framer whileInView) | `[appFadeIn]` directive (IntersectionObserver + CSS transition) |
| `Magnet` | `<app-magnet>` component |
| `AnimatedText` (useScroll/useTransform) | `<app-animated-text>` (scroll listener, direct DOM opacity) |
| Card stack scale (useScroll) | scroll listener in `ProjectCardComponent` |
| Lucide | not used in the spec, so omitted (`lucide-angular` can be added if you add icons) |

## Your content
- Hero photo: `public/portrait.webp` (gradient-mapped, vignetted and faded into the page background). Replace the file to change it.
- Projects: edit `PROJECTS` in `src/app/sections/projects.component.ts`. Images are hotlinked from each live site.
