const fs = require('fs');
const path = require('path');

/**
 * @param {object} details
 * @param {string} details.title
 * @param {string} details.author
 * @param {string} details.publisher
 * @param {string} outputPath 
 */
function writeBookDetails({ title, author, publisher }, outputPath) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const content = [
    '******* Book Details ******',
    `Title     : ${title}`,
    `Author    : ${author}`,
    `Publisher : ${publisher}`,
    `Recorded  : ${new Date().toISOString()}`,
    '*****************************',
  ].join('\n');

  fs.writeFileSync(outputPath, content, 'utf8');
  console.log(`📄 Book details written to: ${outputPath}`);
}

module.exports = { writeBookDetails };
