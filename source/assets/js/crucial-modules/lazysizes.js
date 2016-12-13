import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';
import 'lazysizes/plugins/optimumx/ls.optimumx';

// require('lazysizes/plugins/parent-fit/ls.parent-fit');

let rbLiveClass, rbClickClass;

const rb = window.rb;
const lazyloadClass = 'lazyload';
const importedModules = {};
const lazySizesConfig = window.lazySizesConfig || {};

lazySizesConfig.hFac = 1;
lazySizesConfig.constrainPixelDensity = true;
lazySizesConfig.loadMode = 1;

if(!window.lazySizesConfig){
    window.lazySizesConfig = lazySizesConfig;
}

function configureMediaQueries(){
    const cssConfig = rb.cssConfig;
    const nameSeparator = cssConfig.nameSeparator || rb.nameSeparator || '-';

    document.removeEventListener('lazyunveilread', configureMediaQueries);
    Object.assign(lazySizesConfig.customMedia, cssConfig.mqs);

    rbLiveClass = ['js', 'rb', 'live'].join(nameSeparator);
    rbClickClass = ['js', 'rb', 'click'].join(nameSeparator);
}

function importModule(module){
    if(!importedModules[module] && (!rb.components || !rb.components[module])){
        const importModule = ()=> {
            if(rb.live){
                rb.live.import(module);
                rb.$(`[data-module="${module}"].${rbClickClass}.${lazyloadClass}`).removeClass(lazyloadClass);
            } else {
                setTimeout(importModule, 99);
            }
        };

        const start = ()=>{
            window.lazySizes.rAF(importModule);
        };

        if(rb.ready && rb.ready){
            rb.ready.then(start);
        } else {
            setTimeout(start, 99);
        }
    }

    importedModules[module] = true;
}

document.addEventListener('lazyunveilread', configureMediaQueries);

document.addEventListener('lazyunveilread', (e)=> {
    const container = e.target;
    const module = container.getAttribute('data-module');

    if(module) {
        if(container.classList.contains(rbClickClass)){
            importModule(module);
        } else {
            if(rb.getComponent && rb.ready.isDone && rb.components[module]){
                rb.getComponent(container, module);
            } else {
                window.lazySizes.rAF(()=> {
                    container.classList.add(rbLiveClass);
                    importModule(module);
                });
            }
        }
    }
});

if(document.querySelector(`.${lazyloadClass}`)){
    lazySizes.init();
}
