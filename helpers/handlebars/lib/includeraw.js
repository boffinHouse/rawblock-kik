const fs = require('fs-extra');
const helperUtils = require('./rb-utils');
const Handlebars = require('handlebars');

module.exports = function(src) {
    if(helperUtils.fileExisits(src)) {
        return new Handlebars.SafeString(fs.readFileSync(src));
    }
};
