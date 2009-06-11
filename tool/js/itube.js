(function($){
$.myAccordion = function(options){
	var op = $.extend({
		cont: '', //content selector
		cWrap:'', //category wrapper selector
		duration: 350,
		navi: '', // navigation selector
		wrap:'' // navigation wrapper selector
	}, options),
	dataKey = 'accordion',
	$navi = $(op.navi),
	$conts = $(op.cont),
	$cWrap = $(op.cWrap);
	
	function isAnimated(){
		return $conts.is(':animated');
	}
	
	$conts.sameHeight().hide().filter(':first').show();
	$(op.wrap).height(($cWrap.eq(1).outerHeight() * ($cWrap.length - 1)) + $cWrap.eq(0).outerHeight());
	
	$cWrap
		.width($cWrap.width())
		.each(function(index,elm){
			$.data(elm,'posTop',$(elm).position().top);
		})
		.eq(0).css({top:'auto',position:'static'})
		.nextAll().setAbsolute();
	
	$navi
	.eq(0).addClass('current')
	.end().each(function(index, elm){
		var
		$t = $(elm),
		$c = $conts.eq($navi.index($t)),
		$sttcsTgt = $t.parent().prevAll().andSelf(),
		$notThisNavis = $navi.not($t),
		$nxts = $t.parent().nextAll();
		
		$.data(elm, dataKey, function(){
			if ($c.is(':hidden') && !isAnimated()) {
				$t.addClass('current');
				$sttcsTgt.css({top:'auto',position:'static'});
				$conts.filter(':visible').slideUp(op.duration);
				$c.slideDown(op.duration,function(){
					$notThisNavis.removeClass('current');
					$nxts.setAbsolute();
				});
			}
		});
	})
	.click(function(e){
		$.data(e.target, dataKey).call(e.target);
		return false;
	});
}



$.fn.extend({
createiTunesNavi:function(){
	
	var
	dataKey = $.iTunes.dataKey,
	elmKey = dataKey + '-navi',
	wrapID = elmKey + '-wrap',
	cWrapClass = elmKey + '-category-wrap',
	tglClass = elmKey + '-tgl',
	contClass = elmKey + '-list',
	iCategory = $.iTunes.categories,
	iGenre = $.iTunes.genre,
	$wrap = $('<div>').attr('id', wrapID);
	
	for (var c in iCategory) {
		
		var $cWrap = $('<div>')
			.addClass(cWrapClass)
			.append($('<a>').addClass(tglClass).text(c).attr('title',$.iTunes.cex[c]))
			.appendTo($wrap);
		
		var $gLst = $('<ul>').addClass(contClass).appendTo($cWrap);
		
		for (var g in iGenre) {
			var $a = $('<a>')
				.addClass('genre')
				.attr('href', 'javascript:void(0)')
				.text(g)
				.click(function(e){
					$('a.genre.current').removeClass('current');
					$(e.target).blur().addClass('current');
				});
			
			$.data($a.get(0), dataKey, {
				'category':iCategory[c],
				'genre': iGenre[g]
			});
			
			$('<li>').append($a).appendTo($gLst);
		}
	}
	
	$(this).eq(0).append($wrap);
	
	$.myAccordion({
		cont:'ul.' + contClass,
		cWrap:'div.' + cWrapClass,
		navi:'a.' + tglClass,
		wrap:'#' + wrapID
	});
	
	return this;
},

sameHeight: function(){
	var h = 0;
	return this.each(function(){
		h = Math.max(h, $(this).outerHeight());
	}).height(h);
},

setAbsolute:function(){
	return this.each(function(){
		$(this).css({
			top: $.data(this, 'posTop'),
			position: 'absolute'
		});
	});
}

});

})(jQuery);