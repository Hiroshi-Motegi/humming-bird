(function($){
$.my = {
	slctr: {
		title: '#title',
		footerTitle: '#footer-page-title',
		lastmod: '#lastmod-date',
	},
	title: {
		ja: 'ページタイトル',
		en: 'page title'
	},
	ver: '0.0',
	dateDelimiter: '/',
};

$.attachEvent = function(evName, fn){
	evName = evName.toLowerCase();
	if (window.addEventListener) {
		window.addEventListener(evName, fn, false)}
	else if (window.attachEvent) {
		window.attachEvent('on' + evName, fn)
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