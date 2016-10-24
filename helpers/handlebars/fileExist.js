'use strict';
const Handlebars = require('handlebars');
const helperUtils = require('./hb-utils');

Handlebars.registerHelper('fileExist', function(filePath, options) {
    if(helperUtils.fileExisits(filePath) ) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
