import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3220',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
    headers: {
      "Content-Security-Policy": 
        "default-src 'self' https:;" + // Permite todos os recursos HTTPS por padrão
        "script-src 'self' 'unsafe-inline' 'unsafe-eval';" +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;" +
        "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;" +
        "font-src 'self' https://fonts.gstatic.com data:;" +
        "img-src 'self' data: blob: https:;" +
        "connect-src 'self' http://localhost:3220 ws://localhost:5173;" +
        "frame-src 'self' https://accounts.spotify.com;"
    }
  }
});