const fs = require('fs-extra');
const Highlight = require('highlight.js');
/**
 * Creates syntax highlighting from code files
 * @param {String } filePath - path of code
 * @returns {String} The code example with highlight syntax
 */
module.exports = (filePath) => {
    const matchMetaData = /---(\s*?.*?)*?---/g;
    const regExtension = /\.([0-9a-z]+)(?:[?#]|$)/i;
    const getExtension = filePath.match(regExtension)[1];
    let content = fs.readFileSync(filePath).toString();
    content = getExtension !== 'hbs' ? content : content.replace(matchMetaData, '').replace(/^\s/g,'');
    
    if(!content) {return}
    
    return Highlight.highlight(getExtension, content).value;
};




