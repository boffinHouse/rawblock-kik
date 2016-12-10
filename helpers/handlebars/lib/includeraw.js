const fs = require('fs-extra');
const helperUtils = require('./hb-utils');
const util = require('util');
const Handlebars = require('handlebars');

module.exports = function(src) {
    if(!helperUtils.fileExisits(src)) {
        util.log('No file is found inside helper includeraw');
    }
    
    return new Handlebars.SafeString(fs.readFileSync(src));
};
