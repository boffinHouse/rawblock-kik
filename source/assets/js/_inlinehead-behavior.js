(function(window){
    'use strict';
    var document = window.document;
    var ASSETBASEPATH = window.appGlobals && appGlobals.basePath || '';
    var docElem = document.documentElement;
    var loadJs = function( src, ordered, cb ){
        var script = document.createElement('script');

        if(cb){
            script.addEventListener('load', cb);
        }

        script.src = src;
        script.async = !ordered;
        document.head.appendChild(script);
        return script;
    };
    /*ES6 support detection */
    //var es6support = (function(){
    //    var support = false;
    //    try {
    //        support = eval('(function(x=1){try{eval("((a=a)=>{}())");return !1;}catch(e){}try{eval("((a=b,b)=>{}())");return !1;}catch(e){}return !0;}())')
    //    } catch(e){}
    //    return support;
    //})();

    if(docElem.classList){
        docElem.classList.remove('no-js');
        docElem.classList.add('js');
    }



    setTimeout(function(){
        var arrayProto = Array.prototype;

        if (!Object.assign || !docElem.closest || !arrayProto.includes || !String.prototype.includes || !window.cancelAnimationFrame || !Array.from || !arrayProto.find) {
            loadJs(ASSETBASEPATH + 'assets/js/_polyfills.js', true);
        }

        loadJs(ASSETBASEPATH + 'assets/js/_crucial-behavior.js', true);

        setTimeout(function () {
            loadJs(ASSETBASEPATH + 'assets/js/_main-behavior.js', true);
        });
    });

    if (document.fonts && document.fonts.forEach) {
        document.fonts.forEach(function(font){
            font.load();
        });
    }

})(window);
