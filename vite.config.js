import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.', // корень проекта
  build: {
    outDir: 'dist',     // папка для сборки
    emptyOutDir: true,  // очистка dist перед сборкой
    rollupOptions: {
        input: {
            main: resolve(__dirname, 'index.html'),
            messenger: resolve(__dirname, 'messenger.html'),
            profile: resolve(__dirname, 'profile.html'),
        },
    },
  },
  server: {
    open: true,     // автоматически открывать страницу в браузере
    port: 3000,     // порт dev-сервера
  },
  base: '/social_network/',
});
