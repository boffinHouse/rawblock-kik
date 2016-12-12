const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const fm = require('front-matter');
let data = {
    components: [],
    pages: [],
    styleguide: []
};

module.exports = (filesDirs, options) => {
    filesDirs = filesDirs.split(',');
    
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
            data.pages.push(objData);
        } else if(file.includes('styleguide/pages') && !file.includes('styleguide/pages/app') && !file.includes('styleguide/pages/index')) {
            data.styleguide.push(objData);
        }
    }
    
    filesDirs.forEach((fileDir) => {
        glob.sync(fileDir).forEach(createData);
    });
    
    return options.fn(data);
};


