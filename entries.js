// 增加 entry.js
const path = require('path');
const fs = require('fs');

function getEntries() {
  function isDir(dir) {
    return fs.lstatSync(dir).isDirectory();
  }

  const entries = {
    index: path.join(__dirname, `./src/index.tsx`),
  };
  const componentsDir = path.join(__dirname, './src/components');
  const dirs = fs.readdirSync(componentsDir);
  let absoluteDir = '';
  dirs.forEach((dir) => {
    absoluteDir = path.join(componentsDir, dir);
    if (isDir(absoluteDir)) {
      let entry = path.join(absoluteDir, './index.tsx');
      if (!fs.existsSync(entry)) {
        entry = path.join(absoluteDir, `${dir}.tsx`);
      }
      entries[dir] = entry;
    }
  });
  return entries;
}

const entries = getEntries();

module.exports = entries;
