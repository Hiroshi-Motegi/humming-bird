/**
 * jQuery plugin gChart
 * Copyright 2009
 * Released under the MIT and GPL licenses.
 * 
 * @Author:y@s
 * @Version:1.2
 * @Published:2009-07-02
 * @Update:2009-07-11
 * @Demo:http://humming-bird.googlecode.com/svn/trunk/jquery/demo/gchart.demo.html
 */

(function($){
var
simpleChrs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
extendedChrs = simpleChrs + '-.',

/*
 * デフォルト
 * Required Parameters
 * - chart data
 * - chart size
 * - chart type
 */
_defaults = {
	chd: 't:50,50',
	chs: '200x125',
	cht: 'p3'
};

function gChart() {
	this.initialize.apply(this, arguments);
}

gChart.prototype = {
	initialize: function(options){
		this.params = merge(_defaults, options || {});
	},
	src: function(options){
		return 'http://chart.apis.google.com/chart?' +
			(function(o){
				var ret = [];
				for (var i in o) {
					if (o.hasOwnProperty(i)) 
						ret.push(i + '=' + encodeURIComponent(o[i]));
				}
				return ret.join('&');
			})(merge(this.params, options || {}));
	},
	image: function(options){
		var img = document.createElement('img');
		img.src = this.src(options);
		return img;
	}
};


(function( x, y ){
	for (var i in y) { x[i] = y[i] }
})( gChart, {

	merge:merge,
	
	//テキストエンコードの範囲は 0 (0.0) から 100 (100.0)
	//0 ~ 100の範囲に収まるように数値を調整する
	//@Param - arr: type Array(int)
	textEncoding: function(){
		var ret = [], args = Array.prototype.slice.call(arguments);
		
		for (var i = 0, j = args.length; i < j; i++) {
			var data = [], arg = args[i];

			for (var n = 0, m = arg.length; n < m; n++)
				data.push(Math.round( parseFloat(arg[n]) * 100) / 100 );
			
			ret.push(data.join(','));
		}
		
		return 't:' + ret.join('|');
	},
	

	//簡易エンコード(Simple Encode)
	//数値から簡易エンコード文字に変換
	//@Param - data type:int(0 - 61)
	//@return - Simple Encoded Value
	simpleEncode: function(data){
		return data < 0 ? '_' : simpleChrs.substr(data,1) || '_';
	},
	//@Param - data: type Array(int:0 - 61)
	//@return - Array of Simple Encoded Value
	simpleEncoding: function(){
		var ret = [], args = Array.prototype.slice.call(arguments);
		
		for (var i = 0, j = args.length; i < j; i++) {
			var data = '', arg = args[i];

			for (var n = 0, m = arg.length; n < m; n++)
				data += this.simpleEncode( parseInt(arg[n]) );
			
			ret.push(data);
		}
		
		return 's:' + ret.join(',');
	},
	
	
	//拡張エンコード(Extended Encode)
	//数値から拡張エンコード文字に変換
	//@Param - data: type int(0 - 4095)
	//@return - Extended Encoded Value
	extendedEncode: function(data){
		return data < 0 ? '__' : this.extendedEncodWords[data] || '__';
	},
	//@Param - data: type Array(int:0 - 4095)
	//@return - Array of Extended Encoded Value
	extendedEncoding: function(){
		var ret = [], args = Array.prototype.slice.call(arguments);
		
		for (var i = 0, j = args.length; i < j; i++) {
			var data = '', arg = args[i];
			
			for (var n = 0, m = arg.length; n < m; n++)
				data += this.extendedEncode( parseInt(arg[n]) );
			
			ret.push(data);
		}
		
		return 'e:' + ret.join(',');
	},
	//@Value - type:Array(string AA - ..)
	extendedEncodWords: (function(){
		var chrs = extendedChrs.split(''), len = chrs.length, ret = [];
		
		for (var i = 0; i < len; i++) {
			for (var n = 0; n < len; n++) 
				ret.push(chrs[i] + chrs[n]);
		}
		
		return ret;
	})(),
	
	
	
	// 簡易デコード(Simple Decode)
	//簡易エンコード文字から数値に変換
	simpleDecode: function(v){
		return /[A-Za-z\d]/.test(v) ? simpleChrs.search(v) : null;
	},
	//@return - type:Array(int 0 - 61 or null)
	simpleDecoding: function(data){
		var ret = [];
		
		data = /^s:.*$/.test(data) ? data.substr(2) : data;
		
		var dts = data.split(',');
		
		for (var i = 0; i < dts.length; i++) {
			var ar = [], dt = dts[i];
			for (var n = 0, m = dt.length; n < m; n++) 
				ar.push(this.simpleDecode(dt.substr(n, 1)));
			
			ret.push(ar);
		}
		
		return ret.length == 1 ? ret[0] : ret;
	},
	
	
	//拡張デコード(Extended Decode)
	//拡張エンコード文字から数値に変換
	extendedDecode: function(v){
		var re = /([A-Za-z\d\-\.])([A-Za-z\d\-\.])/.exec(v);
		
		if (re)
			return extendedChrs.search(re[1] == '.' ? '\\.' : re[1]) * 64 + extendedChrs.search(re[2] == '.' ? '\\.' : re[2]);
		
		return null;
	},
	//@return - type Array
	extendedDecoding: function(data){
		var ret = [];
		
		data = /^e:.*$/.test(data) ? data.substr(2) : data;
		
		var dts = data.split(',');
		
		for (var i = 0; i < dts.length; i++) {
			var ar = [], dt = dts[i];
			for (var n = 0, m = dt.length; n < m; n+=2) 
				ar.push(this.extendedDecode(dt.substr(n, 2)));
			
			ret.push(ar);
		}
		
		return ret.length == 1 ? ret[0] : ret;
	}
});

function merge(){
	var
	args = Array.prototype.slice.call(arguments),
	len = args.length,
	ret = {},
	itm;
	
	for( var i = 0; i < len ; i++ ){
		var arg = args[i];
		for (itm in arg) {
			if (arg.hasOwnProperty(itm))
				ret[itm] = arg[itm];
		}
	}
	
	return ret;
}

$.gChart = gChart;

})(jQuery);