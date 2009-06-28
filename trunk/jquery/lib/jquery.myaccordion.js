/**
 * jQuery plugin myAccordion
 * Copyright 2009
 * Released under the MIT and GPL licenses.
 * 
 * Author:y@s
 * Version:1.0
 * Published:2009-06-28
 * Update:2009-06-28
 * Demo:http://humming-bird.googlecode.com/svn/trunk/jquery/demo/myAccordion.html
 */

(function($){
$.extend({
myAccordion: function(options, callback){

	var op = $.extend({
		duration: 300,
		wrap: '#acc-wrap', // wrapper selector
		tgl: '.acc-tgl', // toggle selector
		cont: '.acc-cont' //content selector
	}, options),
	
	dataKey = 'accordion',
	$tgls = $(op.tgl),
	$conts = $(op.cont);
	
	function isAnimated(){
		return $conts.is(':animated');
	}
	
	$conts.sameHeight().hide().filter(':first').show();
	$(op.wrap).css('position','relative').height(($tgls.outerHeight() * $tgls.length) + $conts.outerHeight());

	$tgls
		.css({left:0,width:$tgls.width()})
		.each(function(indx, elm){
			
			$.data(elm, 'position', {
				'top': $(elm).position().top
			});
			
			var
			$t = $(elm),
			$c = $conts.eq(indx),
			$sttcsTgt = $tgls.filter(':lt(' + indx + ')').add($t),
			$notThis = $tgls.not($t),
			$nxts = $tgls.filter(':gt(' + indx + ')');
			
			$.data(elm, dataKey, function(){
				if ($c.is(':hidden') && !isAnimated()) {
					$t.addClass('current');
					$sttcsTgt.setStatic();
					$conts.filter(':visible').slideUp(op.duration);
					$c.slideDown(op.duration, function(){
						$notThis.removeClass('current');
						$nxts.setAbsolute();
					});
				}
			});
			
		}).click(function(e){
			$.data(e.target, dataKey).call(e.target);
			return false;
		})
		.eq(0).setStatic().addClass('current')
		.end().not(':first').setAbsolute();

	if ($.isFunction(callback)) 
		callback.call(this);
}});


$.fn.extend({
sameHeight: function(){
	var h = 0;
	return this.each(function(){
		h = Math.max(h, $(this).outerHeight());
	}).height(h);
},
setAbsolute: function(){
	return this.each(function(indx, elm){
		elm.style.top = ($.data(elm, 'position').top || 0) + 'px';
		elm.style.position = 'absolute';
	});
},
setStatic: function(){
	return this.each(function(indx, elm){
		elm.style.top = 'auto';
		elm.style.position = 'static';
	});
}
})})(jQuery);