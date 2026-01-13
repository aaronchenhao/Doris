# GitHub Pages 部署说明

## 配置 base 路径

在 `vite.config.ts` 中，需要根据你的 GitHub 仓库名配置 `base` 路径：

### 情况1：项目仓库（如 `username/Doris`）
如果仓库名是 `Doris`，访问地址是 `https://username.github.io/Doris/`，则：
```typescript
const base = '/Doris/';
```

### 情况2：主仓库（如 `username/username.github.io`）
如果仓库名是 `username.github.io`，访问地址是 `https://username.github.io/`，则：
```typescript
const base = '/';
```

### 当前配置
当前默认配置为 `/Doris/`，请根据你的实际仓库名修改 `vite.config.ts` 中的 `base` 值。

## 部署步骤

### 方法1：使用 GitHub Actions（推荐）

1. 确保代码已推送到 GitHub
2. 在 GitHub 仓库设置中：
   - 进入 Settings → Pages
   - Source 选择 "GitHub Actions"
3. 推送代码到 `main` 或 `master` 分支，GitHub Actions 会自动构建和部署

### 方法2：手动部署

1. 本地构建：
   ```bash
   npm run build
   ```

2. 将 `dist` 目录的内容推送到 `gh-pages` 分支：
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```
   或者使用 `gh-pages` 工具：
   ```bash
   npm install -D gh-pages
   npm run build
   npx gh-pages -d dist
   ```

3. 在 GitHub 仓库设置中：
   - 进入 Settings → Pages
   - Source 选择 "Deploy from a branch"
   - Branch 选择 `gh-pages`，目录选择 `/ (root)`

## 验证部署

部署完成后，访问 `https://username.github.io/Doris/`（根据你的实际路径）查看网站。

如果遇到 404 错误，检查：
1. `vite.config.ts` 中的 `base` 路径是否正确
2. GitHub Pages 设置是否正确
3. 构建是否成功（检查 Actions 标签页）

## 常见问题

### 资源文件 404
- 确保 `vite.config.ts` 中的 `base` 路径与仓库名匹配
- 重新构建并部署

### Tailwind CSS 样式不生效
- 确保已安装 `@tailwindcss/postcss`
- 检查 `postcss.config.js` 配置
- 确保 `src/index.css` 正确导入了 Tailwind

### 构建失败
- 检查 Node.js 版本（推荐 20+）
- 删除 `node_modules` 和 `package-lock.json`，重新安装依赖
- 检查控制台错误信息
