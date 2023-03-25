// utils/listRoutes.js
import fs from 'fs';
import path from 'path';

function walkDir(dir, folderPrefix = '') {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      // Recurse into subdirectories, excluding 'api' and '_app' folders
      if (!['api', '_app'].includes(file)) {
        results = results.concat(walkDir(fullPath, `${folderPrefix}/${file}`));
      }
    } else {
      // Ignore files with extensions other than .js, .jsx, .ts, and .tsx
      if (/\.(js|jsx|ts|tsx)$/.test(file)) {
        const route = `${folderPrefix}/${file.replace(/\.(js|jsx|ts|tsx)$/, '')}`;

        // Convert 'index' to root route
        results.push(route.replace('/index', ''));
      }
    }
  });

  return results;
}

export function listRoutes() {
  const pagesPath = path.join(process.cwd(), 'pages');
  const routes = walkDir(pagesPath);
  return routes;
}
