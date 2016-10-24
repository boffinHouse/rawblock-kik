'use strict';

const Handlebars = require('handlebars');
const fs = require('fs-extra');
const Highlight = require('highlight.js');


Handlebars.registerHelper('getTemplateCode', function(filePath) {
    const matchMetaData = /---(\s*?.*?)*?---/g;
    const regExtension = /\.([0-9a-z]+)(?:[\?#]|$)/i;
    const getExtension = filePath.match(regExtension);
    let content = fs.readFileSync(filePath).toString();
    const highlightCode = function(fileContent, extension) {
        if(extension) {
            return Highlight.highlight(extension, fileContent).value;
        } else {
            console.log('Extension ' + extension + ' is incorrect')
        }
    }
    
    if(getExtension[1] === 'hbs') {
        content = content.replace(matchMetaData, '').replace(/^\s/g,'');
    }
    
    return highlightCode(content, getExtension[1])
});
    


