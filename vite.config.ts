import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: env.VITE_HOST || '0.0.0.0',
      port: parseInt(env.VITE_PORT, 10) || 5173,
      proxy: {
        '/api': {
          target: env.API_URL,
          changeOrigin: true,
        },
      },
      cors: true,
    },
  };
});
