(async function () {
  const { promises: fs } = require("fs")
  const path = require("path")

  const srcDir = process.argv[2];
  const destDir = process.argv[3];
  /* 
  process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });
  
   */

  console.log(`${srcDir} -> ${destDir}`)

  async function copyDir(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    let entries = await fs.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
      let srcPath = path.join(src, entry.name);
      let destPath = path.join(dest, entry.name);

      entry.isDirectory() ?
        await copyDir(srcPath, destPath) :
        await fs.copyFile(srcPath, destPath);
    }
  }
  copyDir(srcDir, destDir);
})();