# brunowassermann.com

Personal site of Bruno Wassermann, served at https://brunowassermann.com.
Astro 7, deployed to GitHub Pages by GitHub Actions on every push to
`master`. The repository is still called `drbwa.github.io`; that URL
301-redirects to the custom domain.

## Requirements

Node 22.12 or newer (`.nvmrc` pins 24). Nothing else — no Ruby, no Docker.

## Everyday commands

    npm install       # once
    npm run dev       # http://localhost:4321, drafts visible, live reload
    npm run build     # production build into dist/
    npm run preview   # serve dist/ exactly as it will be served live
    npm run check     # type and content-schema check
    npm run links     # broken-link check over dist/

## Writing a post

Create `src/content/blog/<slug>.mdx`. The filename is the URL. Front matter:

    ---
    title: ...
    description: ...        # 20-200 chars, used as the meta description
    pubDate: 2026-10-04
    tags: ["..."]           # optional
    draft: true             # optional; keeps it out of the build
    ---

Diagrams: a fenced ```mermaid block. Figures and charts: put the asset in
`_assets/` beside the post, import it, and use `<Figure>`. Maths: `$...$`
and `$$...$$`. Full guide: DOC 04 section 6 of the rebuild plan
(`docs/rebuild/04-launch-runbook.html`).

## Things that will break if you change them

- `markdown.processor: unified(...)` in `astro.config.mjs`. Astro 7 defaults
  to the Satteri processor, which ignores remark/rehype plugins **silently**.
  Remove that line and maths and heading anchors stop working with no error.
- The feed path. It is `/feed.xml`, matching what Jekyll served. Moving it
  unsubscribes existing readers.
- `src/content/blog/_pipeline-check.mdx`. A permanent draft that exercises
  every feature of the post pipeline. Check it renders after any dependency
  upgrade.
- `public/CNAME`. This is what tells GitHub Pages the site has a custom
  domain — an Actions deploy only sees what the build uploads, so a CNAME
  at the repo root does nothing. The domain also appears in
  `astro.config.mjs`, `src/consts.ts` and `public/robots.txt`; all four
  must agree.
- The Cloudflare DNS records are **DNS only** (grey cloud) on purpose.
  Proxying them blocks GitHub's certificate renewal every 90 days.
- `getStaticPaths` in `src/pages/blog/[...id].astro` filters drafts only
  when `import.meta.env.PROD`. Drafts must stay reachable in `npm run dev`
  but never gain a URL in the production build.

## Deploying

Push to `master`. GitHub Pages is configured to build from Actions
(`.github/workflows/deploy.yml`), not from the legacy Jekyll builder.
