/**
 * jQuery plugin - gChart
 * Copyright 2009
 * Released under the MIT and GPL licenses.
 * 
 * @Author     : y@s
 * @Version    : 1.3
 * @Published  : 2009-07-02
 * @LastUpdate : 2010-06-07
 * @Demo       : http://humming-bird.googlecode.com/svn/trunk/jquery/demo/gchart.demo.html
 */

;(function($){

var
simpleChrs   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
extendedChrs = simpleChrs + '-.',
/**
 * Default - Required Parameters
 * - chart data
 * - chart size
 * - chart type
 */
defaults = {
	chd : 't:50,50',
	chs : '200x125',
	cht : 'p3'
},
gc = function(){};

gc.prototype = {
	/**
	 * Create Google Chart Object
	 * @param p {Object} params
	 */
	create: function( p ){
	
		//Chart class
		var Chart = function(){
			this.initialize.apply(this, arguments);
		};
		
		Chart.prototype = {
			initialize: function( options ){
				this.params = this.merge({}, defaults, options || {});
			},
			
			src: function( options ){
				return 'http://chart.apis.google.com/chart?' +
				(function(o){
					var ret = [], i;
					
					for ( i in o ) {
						if ( o.hasOwnProperty(i) ) {
							ret[ret.length] = i + '=' + encodeURIComponent( o[i] );
						}
					}
					
					return ret.join('&');
				})( this.merge({}, this.params, options || {}) );
			},
			
			image: function( options ){
				var img = new Image();
				img.src = this.src(options);
				return img;
			}
		};
		
		return new Chart( p );
	},
	// merge object
	merge: function(){
		var args = Array.prototype.slice.call( arguments ),
		    j    = args.length,
		    ret  = args[0],
		    i    = 1,
		    itm, arg;
		
		for ( ; i < j ; i++ ) {
			arg = args[i];
			for ( itm in arg ) {
				if ( arg.hasOwnProperty( itm ) ) {
					ret[itm] = arg[itm];
				}
			}
		}
		
		return ret;
	},
	/**
	 * テキストエンコード(Text Encoding)
	 * @param  {Array} in Digit
	 * @return {String}
	 */
	textEncoding: function(){
		var ret  = [],
		    args = Array.prototype.slice.call(arguments),
		    i    = 0,
		    j    = args.length,
			dt, arg, n, m;
		
		for ( ; i < j ; i++ ) {
			dt  = [];
			arg = args[i];
			n   = 0;
			m   = arg.length;
			
			for ( ; n < m ; n++ ) {
				dt[dt.length] = Math.round( parseFloat( arg[n] ) * 100 ) / 100;
			}
			
			ret[ret.length] = dt.join(',');
		}
		
		return 't:' + ret.join('|');
	},
	/**
	 * 簡易エンコード(Simple Encode)
	 * 数値から簡易エンコード文字に変換
	 * @param  data {int}    0 ~ 61
	 * @return      {String} Simple Encoded Value
	 */
	simpleEncode: function(data){
		return data < 0 ? '_' : simpleChrs.substr( data, 1 ) || '_';
	},
	/**
	 * @param  {Array} {int} 0 ~ 61
	 * @return {Array} Simple Encoded Value
	 */
	simpleEncoding: function(){
		var args = Array.prototype.slice.call(arguments),
		    ret  = [],
			i    = 0,
			j    = args.length;
		
		for ( ; i < j ; i++ ) {
			dt  = '';
			arg = args[i];
			n   = 0;
			m   = arg.length;
			
			for ( ; n < m ; n++ ) {
				dt += this.simpleEncode( parseInt( arg[n] ) );
			}
			
			ret[ret.length] = dt;
		}
		
		return 's:' + ret.join(',');
	},
	/**
	 * 拡張エンコード(Extended Encode)
	 * @param  data {int}    0 ~ 4095
	 * @return      {String} Extended Encoded Value
	 */
	extendedEncode: function(data){
		return data < 0 ? '__' : this.extendedEncodWords[data] || '__';
	},
	/**
	 * 拡張エンコード(Extended Encoding)
	 * @param  data {Array} {int}0 - 4095
	 * @return      {Array} Extended Encoded Value
	 */
	extendedEncoding: function(){
		var args = Array.prototype.slice.call(arguments),
		    ret  = [],
		    i    = 0,
		    j    = args.length,
			dt, arg, n, m;
		
		for ( ; i < j ; i++ ) {
			dt  = '';
			arg = args[i];
			n   = 0;
			m   = arg.length;
			
			for ( ; n < m ; n++ ){
				dt += this.extendedEncode( parseInt(arg[n]) );
			}
			
			ret[ret.length] = dt;
		}
		
		return 'e:' + ret.join(',');
	},
	/**
	 * @value {Array} ['AA', ~ , '..']
	 */
	extendedEncodWords: (function(){
		var chrs = extendedChrs.split(''),
		    j    = chrs.length,
		    ret  = [],
		    i    = 0,
		    n;
		
		for ( ; i < j ; i++ ) {
			for ( n = 0 ; n < j ; n++ ) {
				ret[ret.length] = chrs[i] + chrs[n];
			}
		}
		
		return ret;
	})(),
	/**
	 * 簡易デコード(Simple Decode)
	 * 簡易エンコード文字から数値に変換
	 * @param  v {String}      Simple Decode Charactor
	 * @return   {int or null} Decoded Number
	 */
	simpleDecode: function(v){
		return /[A-Za-z\d]/.test(v) ? simpleChrs.search(v) : v == '_' ? -1 : null;
	},
	/**
	 * 簡易デコード(Simple Decoding)
	 * @param  data {String} 
	 * @return      {Array} int 0 - 61 or null
	 */
	simpleDecoding: function( data ){
		data = /^s:.*$/.test(data) ? data.substr(2) : data;
		
		var dts = data.split(','),
		    ret = [],
		    i   = 0,
			j   = dts.length,
			ar, dt, n, m;
		
		for ( ; i < j ; i++ ) {
			ar = [];
			dt = dts[i];
			n  = 0;
			m  = dt.length;
			
			for ( ; n < m ; n++ ) {
				ar[ar.length] = this.simpleDecode( dt.substr( n, 1 ) );
			}
			
			ret[ret.length] = ar;
		}
		
		return ret.length === 1 ? ret[0] : ret;
	},
	/**
	 * 拡張デコード(Extended Decode)
	 * 拡張エンコード文字から数値に変換します。
	 * @param  v {String}      Extended Charactor
	 * @return   {int or null} Decoded Extended Charactor
	 */
	extendedDecode: function( v ){
		var re = /([A-Za-z\d\-\.])([A-Za-z\d\-\.])/.exec(v);
		
		return re
			? extendedChrs.search(re[1] === '.'
				? '\\.'
				: re[1]) * 64 + extendedChrs.search(re[2] === '.'
					? '\\.'
					: re[2])
						: v === '__'
							? -1
							: null;
	},
	/**
	 * 拡張デコード(Extended Decoding)
	 * @param  data {String} 
	 * @return      {Array}  extended Decoded data
	 */
	extendedDecoding: function( data ){
		data = /^e:.*$/.test(data) ? data.substr(2) : data;
		
		var dts = data.split(','),
			ret = [],
			i   = 0,
			j   = dts.length,
			ar, dt, n, m;
		
		for ( ; i < j ; i++ ) {
			ar = [];
			dt = dts[i];
			n  = 0;
			m  = dt.length;
			
			for ( ; n < m ; n += 2 ) {
				ar[ar.length] = this.extendedDecode( dt.substr( n, 2 ) );
			}
			
			ret[ret.length] = ar;
		}
		
		return ret.length === 1 ? ret[0] : ret;
	}
};

$.gChart = new gc;
})(jQuery);