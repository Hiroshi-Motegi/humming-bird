/**
 * jQuery plugin - toList
 * Copyright 2009 y@s
 * Released under the MIT and GPL licenses.
 * 
 * @LastUpdate : 2010-03-19
 * @demo       : http://code.google.com/p/humming-bird/source/browse/trunk/jquery/demo/tolist.demo.html
 */
;(function($){
/**
 * @param  {Array}    arr
 * @param  {Function} callback
 * @param  {String}   tagType
 * @return {String}
 */
$.toList = function(arr, callback, tagType){
	var
	ret = [],
	tag = tagType || "ul",
	i   = arr.length;
	
	while (i--) {
		ret[ret.length] = callback.call(this, arr[i], i);
	}
	
	return '<' + tag + '>'
		+ '<li>' + ret.reverse().join('</li><li>') + '</li>'
		+ '</' + tag + '>';
};


/*past
$.toList = function(arr, callback){
	var lst = [];
	for (var i = 0, k = arr.length; i < k; i++)
		lst.push(callback.call(this, arr[i], i));

	return '<ul><li>' + lst.join('</li><li>') + '</li></ul>';
};
*/
})(jQuery);