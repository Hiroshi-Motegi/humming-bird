/**
 * jQuery plugin - positionCenter
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 * 
 * @Author     : y@s
 * @Version    : 1.1
 * @Published  : 2009/06/06
 * @LastUpdate : 2010/06/07
 * @Demo       : http://humming-bird.googlecode.com/svn/trunk/jquery/demo/positionCenter.demo.html
 */
;(function($){
var $win = $(window);

$.fn.positionCenter = function() {
	
	function isAddedToDom(elm){
		while (elm.parentNode && elm.parentNode.tagName) {
			elm = elm.parentNode;
		}
		return elm.tagName.toLowerCase() === 'html';
	}
	
	return this.each(function( i, elm ){
		
		var
		$elm    = $(elm),
		pos     = $.curCSS( elm, 'position' ),
		isAdded = isAddedToDom(elm),
		$tmp, isAbsolute;
		
		//absolute, fixed, static or relative ?
		if ( pos !== 'absolute' && pos !== 'fixed' ) {
			pos = elm.style['position'] = 'absolute';
		}
		
		isAbsolute = pos === 'absolute';
		
		$tmp = isAdded
			? $elm
			: $elm.clone().hide().appendTo(document.body);
		
		elm.style.margin = '0';
		elm.style.top    = ( $win.height() - $tmp.outerHeight() ) / 2 + ( isAbsolute ? $win.scrollTop()  : 0 ) + 'px';
		elm.style.left   = ( $win.width()  - $tmp.outerWidth()  ) / 2 + ( isAbsolute ? $win.scrollLeft() : 0 ) + 'px';
		
		if ( !isAdded ) {
			$tmp.remove();
		}
	});
};
})(jQuery);