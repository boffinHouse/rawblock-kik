import 'rawblock/_$';
import rb from 'rawblock/_main';
import BezierEasing from 'bezier-easing';

import 'rawblock/components/accordion';

const ASSETBASEPATH = window.appGlobals && appGlobals.basePath || '';
//load dom or jQuery

rb.BezierEasing = BezierEasing;

//if webpack is used:
__webpack_public_path__ = ASSETBASEPATH + 'js/';


require('../../../gulp/js/webpack/globloader!./glob.paths');

require('../../../gulp/js/webpack/lazyglobloader!./lazyglob.paths');

if(window.lazySizesConfig){
    rb.ready.then(()=>{
        setTimeout(()=>{
            if(window.lazySizesConfig.loadMode < 2){
                window.lazySizesConfig.loadMode = 2;
            }
        }, 999);
    });
}

rb.$(rb.live.init);
