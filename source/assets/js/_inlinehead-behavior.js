import 'rawblock/utils/global-rb';

const document = window.document;
const ASSETBASEPATH = (window.appGlobals && appGlobals.basePath || '');
const docElem = document.documentElement;

if(docElem.classList){
    docElem.classList.remove('no-js');
    docElem.classList.add('js');
}

__webpack_public_path__ = ASSETBASEPATH + '/js/';


System.import('../../app');

require('../../routes/index');

if (document.fonts && document.fonts.forEach) {
    document.fonts.forEach(function(font){
        font.load();
    });
}

