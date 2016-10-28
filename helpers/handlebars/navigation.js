'use strict';
const Handlebars = require('handlebars');
const helperUtils = require('./hb-utils');
const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const fm = require('front-matter');


Handlebars.registerHelper('navigation', function(filesDirs, options) {
    filesDirs = filesDirs.split(',');
    let data = {
        components: [],
        pages: [],
        styleguide: []
    };
    
    function createData( file) {
        const href = path.basename(file).replace('.hbs', '.html');
        const fileData = fm(fs.readFileSync(file, 'utf8')).attributes;
        const objData = {
            title: fileData.title || fileData.component,
            tracker: fileData.tracker || '',
            href: href,
        };
        
        if(!objData.title) {return;}
        
        if(file.includes('components')) {
            data.components.push(objData);
        } else if(file.includes('templates/pages')) {
            data.pages.push(objData)
        } else if(file.includes('styleguide/pages')) {
            data.styleguide.push(objData)
        } else {
            console.log('Files are not correct')
        }
        
    }
    
    filesDirs.forEach((fileDir) => {
        glob.sync(fileDir).forEach(createData);
    });
    
    return options.fn(data);
});
