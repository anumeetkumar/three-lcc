import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',  // Specify the root directory for your source files
  server: {
    cors: true, // Enable CORS (defaults to true in development)
  },
});
