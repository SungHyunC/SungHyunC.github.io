# Joshua (Sung Hyun) Kim · Portfolio

A quiet, single-column portfolio with two tabs: **About** (intro, awards, experience,
education, skills, contact) and **Projects** (every project with its image). English/Korean
switching, light/dark themes that follow the operating system, and only gentle motion
(a soft fade-in and a faint light that follows the cursor).

Built with React 19, Vite, TypeScript and Tailwind CSS v4. Live at https://sunghyunc.github.io/.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Edit the content

Every text is a pair `{ en: '…', ko: '…' }`; no component needs to change.

| What | File |
| --- | --- |
| Name, intro, availability, links, awards, experience, education, skills | `src/data/profile.ts` |
| Projects (order, summary, image, links, award tag) | `src/data/projects.ts` |
| Interface labels (tabs, section titles, contact sentence) | `src/lib/i18n.tsx` (`ui`) |

- **Add a project:** copy an entry in `projects`, give it a unique `id`, and either an `image`
  (put the file in `public/projects/`, 16:10 looks best) or a drawn `art`
  (`orbit`, `fly`, `traffic`, `ev`, `moa`). Keep `summary` to one or two sentences.
- **Award tag:** set `award` on the project; it shows as a small gold tag above the title.
- **Resume:** put `resume.pdf` in `public/` and set `resume: 'resume.pdf'` in `profile`.

`#projects` opens the Projects tab directly, and `?lang=ko` opens the Korean version.

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes
it to GitHub Pages (Settings → Pages → Source: GitHub Actions).

Project thumbnails come from the
[profile README repository](https://github.com/SungHyunC/SungHyunC/tree/HEAD/assets/projects).
