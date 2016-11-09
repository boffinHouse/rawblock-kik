if(window.lazySizes){
    if(document.querySelector('.lazyload')){
        lazySizes.init();
        lazySizes.rAF._lsFlush();
    }

    if(window.lazySizesConfig){

        const setLoadPriority = ()=>{
            if(window.lazySizesConfig.loadMode < 2){
                window.lazySizesConfig.loadMode = 2;
            }
        };

        setTimeout(()=>{
            if(window.lazySizesConfig.loadMode < 2 && window.rb && rb.ready){
                rb.ready.then(()=>{
                    setTimeout(setLoadPriority, 999);
                });
            }
        }, 9);
    }
}
