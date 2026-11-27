const fs = require('fs');
const path = require('path');
const vm = require('vm');

module.exports = function collectWebAssets() {
  const assets = {};
  let paths, characters;
  const noop = () => {};
  const monogatari = {
    settings: value => { paths = value.AssetsPath; }, preferences: noop,
    action: () => ({ messages: noop, notifications: noop, particles: noop, objects: noop }),
    configuration: noop, assets: (kind, value) => { assets[kind] = value; },
    characters: value => { characters = value; },
  };
  vm.runInNewContext(fs.readFileSync('js/options.js', 'utf8'), { monogatari });
  const script = fs.readFileSync('js/script.js', 'utf8');
  vm.runInNewContext(script.slice(0, script.indexOf('monogatari.script({')), { monogatari });
  const files = new Set();
  const add = file => files.add(path.normalize(decodeURI(file)));
  for (const [kind, entries] of Object.entries(assets)) {
    for (const file of Object.values(entries)) {
      if (typeof file === 'string') add(`${paths.root}/${paths[kind]}/${file}`);
    }
  }
  for (const character of Object.values(characters)) {
    for (const file of Object.values(character.sprites || {})) {
      add(`${paths.root}/${paths.characters}/${character.directory}/${file}`);
      add(`${paths.root}/${paths.characters}/${character.directory}/mobile/${file}`);
    }
  }
  for (const file of JSON.parse(fs.readFileSync('js/preload-assets.json', 'utf8'))) add(file);
  const sourceFiles = ['index.html', 'manifest.json', ...fs.readdirSync('style').filter(f => f.endsWith('.css')).map(f => 'style/' + f)];
  for (const file of sourceFiles) {
    const source = fs.readFileSync(file, 'utf8');
    for (const match of source.matchAll(/(?:\.\.\/|\.\/)?(assets\/[^"'<>\r\n]+\.(?:webp|png|gif|cur|ico|svg|woff2?))/g)) add(match[1]);
  }
  for (const file of files) if (!fs.existsSync(file)) throw new Error(`Missing game asset: ${file}`);
  return files;
};
