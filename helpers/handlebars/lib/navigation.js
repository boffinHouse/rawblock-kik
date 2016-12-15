const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const fm = require('front-matter');
let removeWhitespace = /\s/g;

module.exports = (data, options) => {
    let newData = [];
    let sectionData;
    data = data.replace(removeWhitespace, '');
    data = data.split(',');
    
    data.forEach((item) => {
        item = item.split(':');
    
        sectionData = {
            title: item[0],
            items: [],
        };
        
        glob.sync(item[1]).forEach((file, _index) => {
            const href = path.basename(file).replace('.hbs', '.html');
            const fileData = fm(fs.readFileSync(file, 'utf8')).attributes;
            const objData = {
                title: fileData.title || fileData.component,
                tracker: fileData.tracker || '',
                href: href,
            };
            
            if(objData.title) {
                sectionData.items.push(objData);
            }
        });
    
        newData.push(sectionData);
    });
    
    return options.fn(newData);
};




