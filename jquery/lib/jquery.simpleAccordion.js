/**
 * jQuery plugin Simple Accordion
 * Copyright 2009
 * Released under the MIT and GPL licenses.
 * 
 * Author:y@s
 * Version:1.0
 * Published:2009-06-28
 * Update:2009-07-02
 * Demo:http://humming-bird.googlecode.com/svn/trunk/jquery/demo/simpleAccordion.html
 */

(function($){
$.simpleAccordion = function( options ) {

	var opt = $.extend({
		tgl:'.acc-tgl',
		cont:'.acc-cont',
		duration:300,
		dataKey:'acc'
	}, options),
	
	$tgls = $( opt.tgl ),
	$conts = $( opt.cont );
	
	$conts.each(function(){
		$(this).height($(this).height());
	}).hide().eq(0).show();
	
	$tgls.eq(0).addClass('current')
	.end().each(function(indx, elm){
		
		var
		$t = $(elm),
		$c = $conts.eq(indx),
		$notThis = $tgls.not($t);
		
		$.data(elm, opt.dataKey, function(){
			if ($c.is(':hidden') && !$conts.is(':animated')) {
				$t.addClass('current');
				$conts.filter(':visible').slideUp(opt.duration, function(){
					$notThis.removeClass('current');
				});
				$c.slideDown(opt.duration);
			}
		});
		
	}).click( function(e) {
		$.data(e.target, opt.dataKey).call(e.target);
		return false;
	});
}
})(jQuery);