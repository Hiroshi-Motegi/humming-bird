/*
 * 
 * 
 * params
 * 	q:
 * v:
 * hl:
 * key:
 * context:
 * num:
 * scoring:
 * output:
 */

(function($){
$.gFeed = function(params, callback){
	var prms = $.extend({
		v:'1.0',
		num:10
	}, params);
	
	if(!prms.q) return false;
	
	$.getJSON('http://ajax.googleapis.com/ajax/services/feed/load?callback=?', prms,
		function(data){
			if(data) callback.call(this, data.responseData.feed);
	});
}
)(jQuery);
