 'use strict';

 const fs = require('fs-extra');
 let utils = {};
 
 utils.fileExisits = function(filePath) {
     try {
         return fs.statSync(filePath).isFile();
     }
     catch (err) {
         return false;
     }
 };
 
 module.exports = utils;
