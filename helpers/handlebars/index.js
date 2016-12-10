const Handlebars = require('handlebars');
const fs = require('fs-extra');
const helpers = require('./lib');
const helpers = {
    webfonts: require('./lib/webfonts'),
    colors: require('./lib/colors'),
    fileExist: require('./lib/fileExist'),
    getTemplateCode: require('./lib/getTemplateCode'),
    includeraw: require('./lib/includeraw'),
    mergeJSON: require('./lib/mergeJSON'),
    navigation: require('./lib/navigation'),
    rbMarkdownFile: require('./lib/rbMarkdownFile'),
}

console.log(helpers);

// module.exports = (() => {
//     for(let name in helpers) {
//         Handlebars.registerHelper(name, helpers[name]);
//     }
// })();





