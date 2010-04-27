/**
 * jQuery plugin jsonToString
 * Copyright 2009
 * Released under the MIT and GPL licenses.
 * 
 * Author     : y@s
 * LastUpdate : 2009-06-06
 * Version    : 1.0
 * demo       : http://humming-bird.googlecode.com/svn/trunk/jquery/demo/jsonToString.html
 */
(function($){

function escapeAndModify(s){
	return (s || '')
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/'/g, '&apos;')
		.replace(/"/g, '&quot;')
		.replace(/&/g, '&amp;');
}

function toUTCFormat ( date ) {
	function pz(n){
		return n < 10 ? "0" + n : n;
	}
    return isFinite(date.valueOf()) ?
		date.getUTCFullYear()        + '-'
		+ pz(date.getUTCMonth() + 1) + '-'
		+ pz(date.getUTCDate())      + 'T'
		+ pz(date.getUTCHours())     + ':'
		+ pz(date.getUTCMinutes())   + ':'
		+ pz(date.getUTCSeconds())   + 'Z' : null;
};

$.parseJSON = function(jsonObject){
	return function fn(o){
		
		if (o === null || o === undefined) return '""';
		
		switch (o.constructor) {
			case Boolean:
			case Number:
				return o;
			case String:
				return '"' + o + '"';
			case Date:
				return '"' + toUTCFormat(o) + '"';
			case Array:
				for (var i = 0, k = o.length, arr = []; i < k; i++)
					arr[arr.length] = fn(o[i]);
				
				return '[' + arr.join(',') + ']';
			case Object:
					var arr = [];
					for (var x in o) {
						if (o.hasOwnProperty(x))
							arr[arr.length] = '"' + x + '":' + fn( o[x] );
					}
					return '{' + arr.join(',') + '}';
			default:
				return null;
		}
	}(jsonObject);
}


//test
$.showJsonString = function(obj){
	$('<textarea>').text($.parseJSON(obj)).appendTo(document.body);
};

})(jQuery);
