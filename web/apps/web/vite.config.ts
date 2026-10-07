import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({ mode }) => {
  const envDir = fileURLToPath(new URL('../../', import.meta.url));
  const env = loadEnv(mode, envDir, '');
  const proxy = {
    '/api': { target: env.API_PROXY_TARGET || 'http://127.0.0.1:3001', changeOrigin: true },
  };
  return {
    plugins: [react()],
    envDir,
    resolve: { conditions: ['development', 'browser'] },
    server: { host: '127.0.0.1', port: 5173, strictPort: true, proxy },
    preview: { proxy },
    build: { sourcemap: false },
  };
});
