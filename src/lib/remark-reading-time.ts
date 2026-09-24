import getReadingTime from 'reading-time';
import type { RemarkPlugin } from '@astrojs/markdown-remark';

// Runs on the raw markdown source rather than the parsed tree, so it needs
// no extra dependency (e.g. mdast-util-to-string) beyond `reading-time`
// itself. Syntax characters (#, *, etc.) inflate the word count slightly,
// which is fine for an estimate shown as "N min".
export const remarkReadingTime: RemarkPlugin = () => (_tree, file) => {
  const { text } = getReadingTime(String(file.value));
  file.data.astro ??= {};
  file.data.astro.frontmatter ??= {};
  file.data.astro.frontmatter.readingTime = text;
};
