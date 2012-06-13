/**
 * jQuery plugin - toJSON (from JSON Object to JSON String)
 * Copyright 2009
 * Released under the MIT and GPL licenses.
 * 
 * Author     : y@s
 * LastUpdate : 2009-06-06
 * Version    : 1.0
 * demo       : http://humming-bird.googlecode.com/svn/trunk/jquery/demo/toJSON.demo.html
 */
;(function($){

/*
function _modify(s){
	return (s || '')
		.replace(/\\/g, '\\\\'  )
		.replace(/\n/g, '\\n'   )
		.replace(/</g , '&lt;'  )
		.replace(/>/g , '&gt;'  )
		.replace(/'/g , '&apos;')
		.replace(/"/g , '&quot;')
		.replace(/&/g , '&amp;' );
}*/

/*
var _escape = (function(){	
	var chr = {
		'\\': '\\\\',
		'\n': '\\n',
		'<' : '&lt;',
		'>' : '&gt;',
		'\'': '&apos;',
		'"' : '&quot;'
	};
	
	return function(s){
		return s.replace(/[<>\'\"\n\\]/g, function(c){
			return chr[c];
		});
	};
})(),*/

var _escape = {
	'\\': '\\\\',
	'\n': '\\n',
	'<' : '&lt;',
	'>' : '&gt;',
	'\'': '&apos;',
	'"' : '&quot;'
},

_r = /[\\<>\'\"\n\x00-\x1f\x7f-\x9f]/g;

function _toUTCFormat ( date ) {
	function z(n){
		return n < 10 ? "0" + n : n;
	}
    return isFinite( date.valueOf() ) ?
	       date.getUTCFullYear()    + '-'
	  + z( date.getUTCMonth() + 1 ) + '-'
	  + z( date.getUTCDate()      ) + 'T'
	  + z( date.getUTCHours()     ) + ':'
	  + z( date.getUTCMinutes()   ) + ':'
	  + z( date.getUTCSeconds()   ) + 'Z' : null;
};


//parse JSON string
$.toJSON = function( jsonObject ){
	return function fn(o){
		
		if ( o === null || o === undefined ) return '""';
		
		switch ( o.constructor ) {
			case Boolean:
			case Number:
				return o;
			
			case String:
				return '"' + ( _r.test(o)
						? o.replace(_r, function(a){
								return _escape[a] || '\\u' + ( 0x10000 + a.charCodeAt() ).toString(16).slice(1);
							})
						: o ) + '"';
			
			case Date:
				return '"' + _toUTCFormat(o) + '"';
			
			case Array:
				for ( var i = 0, k = o.length, arr = [] ; i < k ; i++ )
					arr[arr.length] = fn( o[i] );
				
				return '[' + arr.join(',') + ']';
			
			case Object:
					var arr = [];
					
					for ( var x in o ) {
						if ( o.hasOwnProperty(x) )
							arr[arr.length] = '"' + x + '":' + fn( o[x] );
					}
					
					return '{' + arr.join(',') + '}';
			
			default:
				return '';
		}
	}( jsonObject );
};

//test
$.showJsonString = function(obj){
	$('<textarea>').text( $.toJSON(obj) ).appendTo(document.body);
};

})(jQuery);