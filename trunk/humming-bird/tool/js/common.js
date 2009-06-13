(function($){
$.my = $.extend($.my,{
	slctr: {
		title:'#title',
		footerTitle:'#footer-page-title',
		lastmod: '#lastmod-date'
	}
});

$.attachEvent = function(evName, fn){
	var win = window;
	evName = evName.toLowerCase();
	if (win.addEventListener) {
		win.addEventListener(evName, fn, false)}
	else if (win.attachEvent) {
		win.attachEvent('on' + evName, fn)
	}
}

$.showLastModDate = function(date){
	$.attachEvent('load', function(){
		$($.my.slctr.lastmod).text(
			(function(date){
				if (date.getDate) {
					return (date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate());
				}else{
					return 'no info';
				}
			})(new Date(document.lastModified)));
	});
}

$.setTitle = function(title, ver){
	var pagetitle = title + (ver ? (' ver. ' + ver) : '');
	$($.my.slctr.title).text(pagetitle);
	$($.my.slctr.footerTitle).text(pagetitle);
}
})(jQuery);