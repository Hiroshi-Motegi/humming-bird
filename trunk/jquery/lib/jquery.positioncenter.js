/**
 * jQuery plugin - positionCenter
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 * 
 * @Author     : y@s
 * @Version    : 1.1
 * @Published  : 2009/06/06
 * @LastUpdate : 2010/04/10
 * @Demo       : http://humming-bird.googlecode.com/svn/trunk/jquery/demo/positionCenter.demo.html
 */
(function($){
$.fn.positionCenter = function() {
	var $win = $(window);
	
	return this.each(function(i, elm ){
		
		var
		$elm    = $(elm),
		pos     = $.curCSS( elm, "position" ),
		isAdded = (function isAddedToDom( elm ){
			while(elm.parentNode && elm.parentNode.tagName){
				elm = elm.parentNode;
			}
			return elm.tagName.toLowerCase() === "html";
		})(elm),
		$tmp;
		
		//absolute, fixed, static or relative
		if ( pos !== 'absolute' && pos !== 'fixed' ) {
			pos = elm.style['position'] = 'absolute';
		}
		
		$tmp = !isAdded
			? $elm.clone().hide().appendTo(document.body)
			: $elm;
		
		elm.style['top']    = ( $win.height() - $tmp.outerHeight() + ( pos === 'absolute' ? $win.scrollTop()  : 0 ) ) / 2 + 'px';
		elm.style['left']   = ( $win.width()  - $tmp.outerWidth()  + ( pos === 'absolute' ? $win.scrollLeft() : 0 ) ) / 2 + 'px';
		elm.style['margin'] = '0';
		
		if ( !isAdded ) {
			$tmp.remove();
		}
	});
};
})(jQuery);