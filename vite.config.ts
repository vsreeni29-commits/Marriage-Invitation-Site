import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/Marriage-Invitation-Site/' : '/',
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    sourcemap: false,
  },
});
