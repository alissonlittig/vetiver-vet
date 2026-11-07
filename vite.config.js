import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    sveltekit({
      adapter: adapter({ pages: 'out', assets: 'out' }),
      paths: { base: process.env.BASE_PATH ?? '' },
      inlineStyleThreshold: 100000,
      prerender: { handleHttpError: 'fail' }
    })
  ],
  test: { include: ['tests/**/*.test.js'] }
});
