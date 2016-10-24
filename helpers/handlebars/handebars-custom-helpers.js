'use strict';

const fs = require('fs-extra');
const util = require('util');
const Handlebars = require('handlebars');
const _ = require('lodash');
const Highlight = require('highlight.js');
const marked = require('marked');

const fileExisits = function(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    }
    catch (err) {
        return false;
    }
};


Handlebars.registerHelper('includeraw', function(src){
    if(!fileExisits(src)) {
        util.log('No file is found inside helper includeraw');
    }
    
    return new Handlebars.SafeString(fs.readFileSync(src));
});


Handlebars.registerHelper('getTemplateCode', function(filePath) {
    const matchMetaData = /---(\s*?.*?)*?---/g;
    const regExtension = /\.([0-9a-z]+)(?:[\?#]|$)/i;
    const getExtension = filePath.match(regExtension);
    let content = fs.readFileSync(filePath).toString();
    const highlightCode = function(fileContent, extension) {
        if(extension) {
            return Highlight.highlight(extension, fileContent).value;
        } else {
            console.log('No ')
        }
    }
    
    if(getExtension[1] === 'hbs') {
        content = content.replace(matchMetaData, '').replace(/^\s/g,'');
    }
    
    return highlightCode(content, getExtension[1])
});


Handlebars.registerHelper('md', function(filePath) {
    
    if(fileExisits(filePath)) {
        return marked(fs.readFileSync(filePath).toString());
    }
});

Handlebars.registerHelper('mergeJSON', (function () {
    var slice = [].slice;
    var toObj = function (json) {
        if (typeof json == 'string') {
            try {
                json = json.trim();
                if (!/^(\{|\[).*(]|})$/.test(json)) {
                    json = '{' + json + '}';
                }
                /* jshint ignore:start */
                json = (new Function('return (' + json + ')')());
                /* jshint ignore:end */
            } catch (e) {
                console.log('error with JS string: ' + json);
                json = null;
            }
        }
        return json;
    };
    
    return function () {
        var args = slice.call(arguments);
        var options = args.pop();
        
        args = args.map(toObj);
        
        if (args.length == 1 && this) {
            args.unshift(this || options.data);
        }
        
        args.unshift({});
        return options.fn(_.merge.apply(_, args));
    };
})());
