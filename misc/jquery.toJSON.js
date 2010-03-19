/**
 * jQuery plugin jsonToString
 * Copyright 2009
 * Released under the MIT and GPL licenses.
 * 
 * Author  : y@s
 * Updated : 2009-06-06
 * Version : 1.0
 * demo    : http://humming-bird.googlecode.com/svn/trunk/jquery/demo/jsonToString.html
 */

function escapeAndModify(s){
	return (s || '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&apos;').replace(/"/g, '&quot;');
}

(function($){
$.parseJSON = function(json){
	return (function oFn(o){
		
		if (o === null || o === undefined) return '';
		
		switch (o.constructor) {
			case Boolean:
			case Number:
				return o;
			case String:
				return '\'' + o + '\'';
			case Date:
				return '\'' + (+o) + '\'';
			case Array:
				var arr = [];
				for (var i = 0, k = o.length; i < k; i++)
					arr[arr.length] = oFn(o[i]);
				
				return '[' + arr.join(',\n') + ']';
			case Object:
					var arr = [];
					for (var x in o) {
						if (o.hasOwnProperty(x))
							arr.push(x + ':' + oFn(o[x]));
					}
					return '{\n' + arr.join(',\n') + '\n}';
			default:
				return null;
		}
	})(json);
}


//test
$.showJsonString = function(obj){
	$('<textarea>').text($.parseJSON(obj)).appendTo(document.body);
};

})(jQuery);
