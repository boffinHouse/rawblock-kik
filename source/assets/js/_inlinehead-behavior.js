import 'rawblock/utils/global-rb';

const document = window.document;
const ASSETBASEPATH = (window.appGlobals && appGlobals.basePath || '');
const docElem = document.documentElement;
const foo = appGlobals ? 'home' : '';

if(docElem.classList){
    docElem.classList.remove('no-js');
    docElem.classList.add('js');
}

__webpack_public_path__ = ASSETBASEPATH + 'js/';

require('bundle-loader!../../app');

require('bundle-loader!../../layouts/'+ foo);

if (document.fonts && document.fonts.forEach) {
    document.fonts.forEach(function(font){
        font.load();
    });
}

