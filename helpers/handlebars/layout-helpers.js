const handlebars = require('handlebars');
const layouts = require('handlebars-layouts');

handlebars.registerHelper(layouts(handlebars));
layouts.register(handlebars);
