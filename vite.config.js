import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // optional splitting for better performance
        },
      },
    },
  },
  server: {
    historyApiFallback: true,  // Add this line
  },
});
