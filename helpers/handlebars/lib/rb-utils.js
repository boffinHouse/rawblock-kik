const fs = require('fs-extra');
let utils = {};
 
 utils.fileExisits = (filePath) => {
     try {
         return fs.statSync(filePath).isFile();
     }
     catch (err) {
         return false;
     }
 };
 module.exports = utils;
