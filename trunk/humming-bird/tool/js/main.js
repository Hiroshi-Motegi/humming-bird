jQuery(function($){
	$.setTitle('humming bird');
	$.showLastModDate();
	
	if ($(window).height() < $(document.body).height()) {
		$('#outer-wrap3').height($(window).height() - ($('#header-wrap').outerHeight() + $('#footer-wrap').outerHeight() + ($('.line-outer').outerHeight() * 2)));
	}
	
});