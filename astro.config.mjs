import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import mermaid from 'astro-mermaid';
import { unified, rehypeHeadingIds } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  // The custom domain. One of the four places it appears — see DOC 02 T1.8.
  // No trailing slash. Astro's default `build.format: 'directory'` already
  // emits /publications/index.html, which GitHub Pages serves at
  // /publications/ — matching the Jekyll URLs we must preserve.
  site: 'https://brunowassermann.com',

  markdown: {
    // REQUIRED. Astro 7 defaults to the Satteri processor, which ignores
    // remark/rehype plugins silently. Do not remove this line.
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeKatex,
        // rehypeHeadingIds must run before autolink so the anchors have
        // ids to point at.
        rehypeHeadingIds,
        [rehypeAutolinkHeadings, {
          behavior: 'append',
          properties: { className: ['heading-anchor'], ariaHidden: 'true', tabIndex: -1 },
          content: { type: 'text', value: '#' },
        }],
        [rehypeExternalLinks, {
          target: '_blank',
          rel: ['noopener', 'noreferrer'],
          protocols: ['http', 'https'],
        }],
      ],
    }),
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: false,
    },
  },

  integrations: [
    // mermaid() must come first: it rewrites fenced `mermaid` blocks
    // before any other markdown-processing integration sees them.
    mermaid({ theme: 'neutral', autoTheme: true, enableLog: false }),
    mdx(),
    sitemap(),
  ],
});
