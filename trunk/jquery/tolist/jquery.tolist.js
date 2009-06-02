/*
 * jQuery plugin toList
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 */

(function($){
$.toList = function(arr, callback){
	var lst = [];
	for (var i = 0, k = arr.length; i < k; i++)
		lst.push(callback.call(this, arr[i], i));

	return '<ul><li>' + lst.join('</li><li>') + '</li></ul>';
}
})(jQuery);