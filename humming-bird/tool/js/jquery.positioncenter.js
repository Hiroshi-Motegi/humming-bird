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
			
			$te = (!this.parentNode || !this.parentNode.tagName) ? $t.clone().hide().appendTo(document.body) : $t;
			
			var ts = this.style;
			ts['top'] = ( win.h - $te.outerHeight() + (ps == 'absolute' ? win.st : 0) ) / 2 + 'px';
			ts['left'] = (win.w - $te.outerWidth() + (ps == 'absolute' ? win.sl : 0) ) / 2 + 'px';
			ts['margin'] = '0px';
			
			if($te != $t) $te.remove();

		});
	}
});
})(jQuery);