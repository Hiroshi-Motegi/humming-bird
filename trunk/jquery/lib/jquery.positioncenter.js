/**
 * jQuery plugin - positionCenter
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 * 
 * @Author : y@s
 * @Version : 1.1
 * @Published : 2009/06/06
 * @Update : 2009/07/01
 * @Demo : http://humming-bird.googlecode.com/svn/trunk/jquery/demo/twitter.html
 */

(function($){
$.fn.extend({
	positionCenter: function() {
		var 
		$win = $(window),
		win = {
			h:$win.height(),
			w:$win.width(),
			st:$win.scrollTop(),
			sl:$win.scrollLeft()
		};
		
		return this.each(function(){
			
			var
			$t = $(this),
			ts = this.style,
			ps = $t.css('position'),
			$te;
			
			if(ps != 'absolute' && ps != 'fixed')
				ps = ts['position'] = 'absolute';
			
			$te = (!this.parentNode || !this.parentNode.tagName) ?
				$t.clone().hide().appendTo(document.body) : $t;
			
			var ts = this.style;
			ts['top'] = ( win.h - $te.outerHeight() + (ps == 'absolute' ? win.st : 0) ) / 2 + 'px';
			ts['left'] = ( win.w - $te.outerWidth() + (ps == 'absolute' ? win.sl : 0) ) / 2 + 'px';
			ts['margin'] = '0';
			
			if($te != $t)
				$te.remove();

		});
	}
});
})(jQuery);



/*
(function($){
$.fn.extend({
	positionCenter: function() {
		var 
		$win = $(window),
		win = {
			h:$win.height(),
			w:$win.width(),
			st:$win.scrollTop(),
			sl:$win.scrollLeft()
		};
		
		return this.each(function(){
			var
			$t = $(this),
			to = {},
			posStyle =  $.css(this,'position');
			
			if(posStyle != 'absolute' && posStyle != 'fixed') {
				$t.css({ position:'absolute' });
				posStyle = $.css(this,'position');
			}
			
			function getOuterSize($x){
				to.h = $x.outerHeight();
				to.w = $x.outerWidth();
			}
			
			//!this.parentNode.tagName はIE対策
			if (!this.parentNode || !this.parentNode.tagName) {
				var $cln =$t.clone().hide().appendTo(document.body);
				getOuterSize($cln);
				$cln.remove();
			}else{
				getOuterSize($t);
			}
			
			var cPos = {
				top: Math.floor((win.h - to.h)/2),
				left: Math.floor((win.w - to.w)/2)
			}
			
			if (posStyle == 'absolute') {
				cPos.top += win.st;
				cPos.left += win.sl;
			}

			$t.css({
				top:cPos.top,
				left:cPos.left,
				margin:0
			});
		});
	}
});
})(jQuery);
*/