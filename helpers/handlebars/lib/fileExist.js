const helperUtils = require('./rb-utils');

module.exports = (filePath, options) => {
    if(helperUtils.fileExisits(filePath) ) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
};
