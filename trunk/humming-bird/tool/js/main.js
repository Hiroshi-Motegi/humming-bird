(function($){
$.HatenaBCount = function(link){
	return $('<a>').addClass('bkm-cnt').attr('href', 'http://b.hatena.ne.jp/entry/' + link)
			.append($('<img>').attr('src', 'http://b.hatena.ne.jp/entry/image/' + link));
}
$.HatenaBEntryList = function(link){
	return $('<a>').addClass('bkm-cnt').attr('href', 'http://b.hatena.ne.jp/entrylist?url=' + link)
			.append($('<img>').attr('src', 'http://b.hatena.ne.jp/bc/bl/' + link));
}
$.fn.HatenaBCount = function(){
	return this.each(function(indx, elm){
		var href = $(elm).attr('href');
		if(href){
			if( /https?:\/\/.+/.test(href)){
				$(elm).after($.HatenaBEntryList(href));
			}else{
				$(elm).after($.HatenaBCount(document.URL + href));
			}
		}
	});
}
})(jQuery);


jQuery(function($){
	$.setTitle('humming bird');
	$.showLastModDate();
	
	if ($(window).height() > $(document.body).height()) {
		$('#outer-wrap3').height($(window).height() - ($('#header-wrap').outerHeight() + $('#footer-wrap').outerHeight() + ($('.line-outer').outerHeight() * 2)));
	}
	
	/*$('a.htnb-target').HatenaBCount();*/
	
});