var ASSETBASEPATH = window.appGlobals && appGlobals.basePath || '';
//load dom or jQuery
require('rawblock/sources/js/libs/rb_$');

require('rawblock/sources/js/libs/rb_main');

rb.BezierEasing = require('bezier-easing');

/* configuration */
rb.isDebug = 1;

//if webpack is used:
__webpack_public_path__ = ASSETBASEPATH + 'js/';


require('rawblock/sources/components/rb_panel/rb_panel');
require('rawblock/sources/components/rb_panelgroup/rb_panelgroup');
require('rawblock/sources/components/rb_tabs/rb_tabs');


require('../../gulp/js/webpack/globloader!./glob.paths');

require('../../gulp/js/webpack/lazyglobloader!./lazyglob.paths');

rb.$(rb.live.init);
