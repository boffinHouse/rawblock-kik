'use strict';

const Handlebars = require('handlebars');
const fs = require('fs-extra');
const helperUtils = require('./hb-utils');

Handlebars.registerHelper('getColors', (file, options) => {
    let data = [];
    const regVarSplit = /(\$.*?):(.*?);/g;
    const content = fs.readFileSync(file).toString();
    const colors = content.match(regVarSplit);
    
    if(!helperUtils.fileExisits(file)) {return;}
    
    colors.forEach((color) => {
        regVarSplit.lastIndex = 0;
        color = regVarSplit.exec(color) || null;
        
        if(color) {
            data.push({
                name: color[1],
                color: color[2],
                variable: color[0]
            });
        }
    });
    
    return options.fn(data);
});
