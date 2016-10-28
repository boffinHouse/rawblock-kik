'use strict';
const Handlebars = require('handlebars');
const helperUtils = require('./hb-utils');
const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const fm = require('front-matter');

Handlebars.registerHelper('navigation', function(filePaths) {
    filePaths = filePaths.split(',');
    let data = [];
    filePaths.forEach((filePath) => {
        glob.sync(filePath).forEach((file, index) => {
            const pageHref = path.basename(file).replace('.hbs', '.html');
            const fileData = fs.readFileSync(file, 'utf8');
            data.push(fm(fileData));
    
            if(file.includes('components')) {
                //console.log(pageHref, 'components');
            }
            
            if(file.includes('templates/pages')) {
                //console.log(pageHref, 'pages');
            }
            
        });
    });
    
    console.log(data.attributes)
    
});
