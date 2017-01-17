// import 'rawblock/utils/global-rb';
import loadJs from './modules/loadjs-simple';

const document = window.document;
const ASSETBASEPATH = window.appGlobals && appGlobals.basePath || '';
const docElem = document.documentElement;

/*ES6 support detection */
// var es6support = (function(){
//    var support = false;
//    try {
//        support = eval('(function(x=1){try{eval("((a=a)=>{}())");return !1;}catch(e){}try{eval("((a=b,b)=>{}())");return !1;}catch(e){}return !0;}())')
//    } catch(e){}
//    return support;
// })();

if(docElem.classList){
    docElem.classList.remove('no-js');
    docElem.classList.add('js');
}

setTimeout(()=> {
    const arrayProto = Array.prototype;

    if (!Object.assign || !docElem.prepend || !docElem.after || !arrayProto.includes || !String.prototype.includes || !window.cancelAnimationFrame || !Array.from || !arrayProto.find) {
        loadJs(ASSETBASEPATH + 'js/_polyfills.js', true);
    }

    loadJs(ASSETBASEPATH + 'js/_crucial-behavior.js', true);
    loadJs(ASSETBASEPATH + 'js/_main-behavior.js', true);
});

if (document.fonts && document.fonts.forEach) {
    document.fonts.forEach(function(font){
        font.load();
    });
}

