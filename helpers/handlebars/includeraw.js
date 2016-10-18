'use strict';

const fs = require('fs-extra');
const util = require('util');
const Handlebars = require('handlebars');
const fileExisits = function(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    }
    catch (err) {
        return false;
    }
};

Handlebars.registerHelper('includeraw', function(src){
    if(!fileExisits(src)) {
        util.log('No file is found inside helper includeraw');
    }
    
    return new Handlebars.SafeString(fs.readFileSync(src));
});
