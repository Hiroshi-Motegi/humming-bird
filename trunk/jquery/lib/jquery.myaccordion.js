/**
 * jQuery plugin myAccordion
 * Copyright 2009
 * Released under the MIT and GPL licenses.
 * 
 * Author    : y@s
 * Version   : 1.0
 * Published : 2009-06-28
 * Update    : 2010-04-20
 * Demo      : http://humming-bird.googlecode.com/svn/trunk/jquery/demo/myAccordion.html
 */

;(function($){
var dataKey = '';

$.fn.extend({
sameHeight: function(){
	var h = 0;
	return this.each(function(){
		h = Math.max( h, $(this).outerHeight() );
	}).height(h);
},
setAbsolute: function(){
	return this.each(function(i, elm){
		elm.style.top      = ($.data(elm, dataKey).top || 0) + 'px';
		elm.style.position = 'absolute';
	});
},
setStatic: function(){
	return this.each(function(i, elm){
		elm.style.top      = 'auto';
		elm.style.position = 'static';
	});
}
});

$.extend({
myAccordion: function( options, callback ){

	var
	opt = $.extend({
		duration : 0,
		wrap     : '#acc-wrap',    // wrapper selector
		toggle   : '.acc-toggle',  // toggle selector
		content  : '.acc-content', // content selector
		dataKey  : 'accordion'
	}, options),
	
	$toggles  = $( opt.toggle ),
	$contents = $( opt.content );
	
	dataKey = opt.dataKey;
	
	$contents
		.sameHeight()
		.hide()
		.filter(':first')
		.show();
	
	$(opt.wrap)
		.css( 'position', 'relative' )
		.height((function(){
				var h = 0;
				$toggles.each(function(){
					h += $(this).outerHeight();
				});
				return h;
			})() + $contents.outerHeight());

	$toggles
		.css({
			left : 0,
			width: $toggles.width()
		})
		.each(function(i, elm){
			var
			$self     = $(elm), //toggle button
			$content  = $contents.eq(i), // content of same index
			$sttcsTgt = $toggles.filter( ':lt(' + i + ')' ).add($self),
			$notSelf  = $toggles.not($self),
			$nexts    = $toggles.filter( ':gt(' + i + ')' );
			
			$.data(elm, dataKey, {
				'top': $(elm).position().top,
				'fn' : function(){
					if ($content.is(':hidden') && !$contents.is(':animated')) {
						$self.addClass('current');
						$sttcsTgt.setStatic();
						$contents.filter(':visible').slideUp(opt.duration);
						$content.slideDown(opt.duration, function(){
							$notSelf.removeClass('current');
							$nexts.setAbsolute();
						});
					}
				}
			});
		})
		.click(function(e){
			$.data(e.target, dataKey).fn.call(e.target);
			return false;
		})
		.eq(0)
		.setStatic()
		.addClass('current')
		.end()
		.not(':first')
		.setAbsolute();

	callback = $.isFunction(options) ? options : callback || function(){};
	callback.call(this);

}});
})(jQuery);