'use strict';

const Handlebars = require('handlebars');
const fs = require('fs-extra');
const helperUtils = require('./hb-utils');
const marked = require('marked');

Handlebars.registerHelper('md', function(filePath) {

    if(helperUtils.fileExisits(filePath)) {
        return marked(fs.readFileSync(filePath).toString());
    }
});
