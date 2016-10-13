var ASSETBASEPATH = window.appGlobals && appGlobals.basePath || '';
//load dom or jQuery
require('rawblock/sources/js/libs/rb_$');

require('rawblock/sources/js/libs/rb_main');

rb.BezierEasing = require('bezier-easing');

/* configuration */
rb.isDebug = 1;

//if webpack is used:
__webpack_public_path__ = ASSETBASEPATH + 'js/';

require('../../gulp/js/webpack/globloader!./glob.paths');

require('../../gulp/js/webpack/lazyglobloader!./lazyglob.paths');

rb.$(rb.live.init);
