const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = path.resolve(__dirname, '..');
const versions = {};
function visit(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) visit(file);
    else if (!item.name.startsWith('.')) {
      const relative = path.relative(root, file).split(path.sep).join('/');
      if (relative === 'js/asset-versions.json') continue;
      versions[relative] = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 20);
    }
  }
}
for (const folder of ['assets', 'js', 'style', 'engine/core', 'engine/debug']) {
  if (fs.existsSync(path.join(root, folder))) visit(path.join(root, folder));
}
fs.writeFileSync(path.join(root, 'js/asset-versions.json'), JSON.stringify(versions, null, 2));
console.log('Asset versions updated: ' + Object.keys(versions).length);
