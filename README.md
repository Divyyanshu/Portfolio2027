# Divyanshu Tailor - Portfolio

React + Vite + Tailwind CSS + Three.js + Framer Motion.

## Run

```bash
npm install
npm run dev      # local dev
npm run build    # production build in /dist
```

## Where to edit

Everything (text, projects, links, testimonials) lives in **`src/data.js`**.
Search for `// REPLACE` to find every dummy value.

- **Screenshots:** put images in `public/shots/` and add them to a project,
  e.g. `screenshots: [{ src: "/shots/daksh-1.png", alt: "Home" }]`.
  The first image is used on cards; the first three on the detail page.
- **Store links:** `projects[].links.playStore / appStore / demo`.
- **Testimonials:** `testimonials` array (currently dummy).
- **Resume link:** `profile.links.resume` (put the PDF in `public/` and use `/resume.pdf`).
- **Contact form:** set `FORM_ENDPOINT` (Formspree / Web3Forms). While empty,
  the form opens the visitor's email app instead.
- **Your photo:** About page, replace the "DT" placeholder block.

## Deploy

Uses hash routing (`/#/projects`), so it works on any static host without
rewrite rules: Netlify, Vercel, GitHub Pages, Cloudflare Pages.
Build command `npm run build`, output folder `dist`.
