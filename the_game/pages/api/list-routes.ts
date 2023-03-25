// pages/api/list-routes.js

import fs from 'fs';
import path from 'path';

function walkDir(dir, folderPrefix = '') {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      if (!['api', '_app'].includes(file)) {
        results = results.concat(walkDir(fullPath, `${folderPrefix}/${file}`));
      }
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      const route = `${folderPrefix}/${file.replace(/\.(js|jsx|ts|tsx)$/, '')}`;
      results.push(route.replace('/index', ''));
    }
  });

  return results;
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const pagesPath = path.join(process.cwd(), 'pages');
    const routes = walkDir(pagesPath);
    res.status(200).json(routes);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
