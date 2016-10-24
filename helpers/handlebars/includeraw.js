'use strict'
const Handlebars = require('handlebars');
const fs = require('fs-extra');
const helperUtils = require('./hb-utils');
const util = require('util');

Handlebars.registerHelper('includeraw', function(src){
    if(!helperUtils(src)) {
        util.log('No file is found inside helper includeraw');
    }
    
    return new Handlebars.SafeString(fs.readFileSync(src));
});
