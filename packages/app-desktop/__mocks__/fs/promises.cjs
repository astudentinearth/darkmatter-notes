const { fs } = require("memfs");
console.log("mocking node:fs/promises");
module.exports = fs.promises;
