"use strict";

var path = require('path');
var regSplit = /\s+/gm;
var expand = require('glob-expand');

module.exports = function (content, _sourceMap) {
    var patterns = content.trim().split(regSplit);
    var files = expand(
        {
            'cwd': path.dirname(this.resourcePath),
            'filter': 'isFile'
        },
        patterns
    );

    return 'module.exports = [\n' + files.map(function (file) {
            return '  require(' + JSON.stringify(file) + ')';
        }).join(',\n') + '\n];';
};
