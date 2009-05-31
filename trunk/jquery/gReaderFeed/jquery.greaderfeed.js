(function($){
$.gReaderFeed = function(url, options, fn){
	var opt = $.extend({
		n:10
	}, options);
	
	$.getJSON('http://www.google.com/reader/public/javascript/feed/' + url + '?callback=?', opt, fn);
}
})(jQuery);