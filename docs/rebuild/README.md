# Site rebuild plan — September 2026

Planning documents for replacing this Jekyll/minima site with an Astro 7 site on a
custom domain, with posts syndicated to Substack.

These are self-contained HTML pages: open them in a browser, no build step. They are
archived here so the plan travels with the repository rather than living only in a
chat log.

## The documents

| | Document | What it is | Read it if |
|---|---|---|---|
| 01 | [`01-decision.html`](01-decision.html) | Audit of the old site, comparison of the 2026 static-site generators, risk register, phase plan, and the record of every decision taken — including why not just Substack | You want the reasoning |
| 02 | [`02-build-spec.html`](02-build-spec.html) | The executable plan. Exact commands, pinned versions, full file contents, `Done when` conditions per task | You are building it |
| 03 | [`03-design-copy.html`](03-design-copy.html) | The design system as fixed tokens and stylesheets, plus every word of the new site copy | You are building it, or reviewing the words |
| 04 | [`04-launch-runbook.html`](04-launch-runbook.html) | Verification checklists, the Cloudflare/GitHub Pages cutover, rollback, and the guide to writing a post with diagrams and charts | You are launching it, or writing a post later |
| 05 | [`05-syndication.html`](05-syndication.html) | The Substack half: build deltas, the per-post cross-posting checklist, and what survives the paste | You are wiring up syndication |

Documents 02, 03 and 04 predate the syndication decision and are unchanged. Document 05
carries the additions rather than duplicating them, so their internal navigation strips
still show four documents.

## Decisions taken

- **Astro 7** (7.3.2), deployed to GitHub Pages from GitHub Actions rather than the legacy Jekyll builder.
- **Custom domain** `brunowassermann.com`, registered at Cloudflare. `drbwa.com` redirects to it.
- **Web CV** at `/cv/` — email only, no phone number, no address, no PDF.
- **Posts publish here first, always**, then syndicate to Substack. The site is canonical.
- **Comments live on Substack.** No third-party scripts on the site.
- No analytics and no tag pages at launch.

## The two traps

Both are documented at length in the plan, and both fail silently:

1. **Astro 7's default Markdown processor ignores remark/rehype plugins.** Astro 7 ships
   Sätteri, which has its own plugin API. `astro.config.mjs` must select the unified
   processor explicitly or maths and heading anchors stop working with no error and no
   failed build. See DOC 02 T1.3.
2. **Cloudflare's proxy blocks GitHub's HTTPS certificate.** Every GitHub-facing DNS
   record must be *DNS only* (grey cloud), or `Enforce HTTPS` never becomes available —
   and the same thing breaks certificate *renewal* every 90 days. See DOC 04 §4.

## Live copies

These pages are also published as private artifacts, which is where edits are made:

- 01 — https://claude.ai/artifact/MCWKh8Jw2NDx9bUk7ti9m3
- 02 — https://claude.ai/code/artifact/b112e9a7-be6c-4931-8910-ff71002e25c8
- 03 — https://claude.ai/code/artifact/c368e0da-c18a-4ffc-a072-f4808395658b
- 04 — https://claude.ai/code/artifact/91634183-ffb8-42d3-ae4c-740a77e76ee1
- 05 — https://claude.ai/artifact/Y2sfQGiWZhFtdqGfF1RYoJ

The copies in this directory are snapshots; if they and the artifacts disagree, the
artifacts are newer.
