# Joshua (Sung Hyun) Kim · Portfolio

A bento-grid portfolio with a research-themed animated background (pursuit–evasion
trajectories and orbits), English/Korean switching and light/dark themes that follow the
operating system.

Built with React 19, Vite, TypeScript, Tailwind CSS v4 and Motion.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Edit the content

Everything you see comes from three data files; no component needs to change.

| What | File |
| --- | --- |
| Name, bio, links, education, photo, resume | `src/data/profile.ts` (`profile`) |
| Research, timeline, team contributions, tech stack | `src/data/profile.ts` |
| Projects, awards, filter categories | `src/data/projects.ts` |
| Interface labels (buttons, section titles) | `src/lib/i18n.tsx` (`ui`) |

Every text is a pair `{ en: '…', ko: '…' }`.

- **Add a project:** copy an entry in `projects`, give it a unique `id`, and either an `image`
  (put the file in `public/projects/`) or an animated `art` (`orbit`, `fly`, `traffic`, `ev`, `moa`).
- **Mark an award:** set `award` on the project. Award projects get the gold ribbon, the
  rotating gold border, a laurel badge and a wider card automatically.
- **Profile photo / resume:** put `profile.jpg` or `resume.pdf` in `public/` and set
  `photo: 'profile.jpg'` / `resume: 'resume.pdf'` in `profile`. Empty strings hide them.
- **Feature a different project in the bento:** change the ids passed to `FeaturedTile`,
  `F16Tile` and `WideTile` in `src/components/Bento.tsx`.

`?lang=ko` in the URL opens the Korean version directly.

## Deploy to GitHub Pages

1. Push this folder to a repository named **`SungHyunC.github.io`** (served at
   `https://sunghyunc.github.io/`). Any other name also works and is served at
   `https://sunghyunc.github.io/<name>/`, because asset paths are relative.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which builds and publishes `dist/`.

Project thumbnails come from the
[profile README repository](https://github.com/SungHyunC/SungHyunC/tree/HEAD/assets/projects).
