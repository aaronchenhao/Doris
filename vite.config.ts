import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // GitHub Pages 部署路径配置
    // 如果仓库名是 "Doris"，则 base 应该是 "/Doris/"
    // 如果是主仓库（username.github.io），则 base 应该是 "/"
    // 请根据你的实际仓库名修改这里的值
    const base = process.env.GITHUB_REPOSITORY 
      ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
      : '/Doris/'; // 默认值，请根据实际情况修改
    
    return {
      base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
      }
    };
});
