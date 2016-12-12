const fs = require('fs-extra');
const helperUtils = require('./rb-utils');
const marked = require('marked');

module.exports = (filePath) => {
    if(helperUtils.fileExisits(filePath)) {
        return marked(fs.readFileSync(filePath).toString());
    }
};
