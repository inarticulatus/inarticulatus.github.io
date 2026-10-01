// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://utkarshtripathi.com',
  base: '/',
  // trailingSlash: "always",
  integrations: [
    mdx(),
    sitemap({
      // Old slug redirect stub: keep it out of the sitemap so only the
      // /projects/mantasol/ is a legacy redirect to the canonical
      // /projects/craton-labs/ URL and must not be advertised to crawlers.
      filter: (page) => !page.includes('/projects/mantasol/'),
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});