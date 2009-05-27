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