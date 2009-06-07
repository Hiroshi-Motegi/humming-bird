(function($){
$.my = $.extend($.my,{
	slctr: {
		title:'#title',
		footerTitle:'#footer-page-title',
		lastmod: '#lastmod-date'
	},
	title:{
		ja: 'ページタイトル',
		en: 'page title'
	},
	ver: '0.0',
	dateDelimiter: '/'
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
				return date.getFullYear() + $.my.dateDelimiter + (date.getMonth() + 1) + $.my.dateDelimiter + date.getDate()
			})(new Date(document.lastModified)));
	});
}

$.setTitle = function(title, ver){
	var pagetitle = title + ' ver. ' + ver;
	$($.my.slctr.title).text(pagetitle);
	$($.my.slctr.footerTitle).text(pagetitle);
}
})(jQuery);