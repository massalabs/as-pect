const fs = require('fs').promises;
const path = require('path');

const dirPath = process.argv[2];

if (!dirPath) {
  console.error('Please provide a directory path');
  process.exit(1);
}

async function cleanDirectory(dir) {
  try {
    const files = await fs.readdir(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.lstat(filePath);

      if (stat.isDirectory()) {
        await cleanDirectory(filePath);
        await fs.rmdir(filePath);
      } else {
        await fs.unlink(filePath);
      }
    }

    console.log(`Files deleted successfully in ${dir}`);
  } catch (err) {
    console.error(`Error deleting files in ${dir}:`, err);
  }
}

cleanDirectory(path.join(__dirname, dirPath)).catch(console.error);