const Handlebars = require('handlebars');
const glob = require('glob');
const path = require('path');

module.exports = function() {
    glob.sync('./helpers/handlebars/lib/**/*.js').forEach((file) => {
        let name = path.basename(file).replace(/\.[^/.]+$/, '');
        let filePath = path.resolve(file);
        
        Handlebars.registerHelper(name, require(filePath));
    });
};





