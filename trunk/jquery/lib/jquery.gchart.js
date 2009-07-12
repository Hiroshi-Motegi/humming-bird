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
		this.params = gChart.merge({}, _defaults, options || {});
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
			})(gChart.merge({}, this.params, options || {}));
	},
	image: function(options){
		var img = document.createElement('img');
		img.src = this.src(options);
		return img;
	}
};


gChart.merge = function(){
	var
	args = Array.prototype.slice.call(arguments),
	len = args.length,
	ret = args[0],
	itm;
	
	for (var i = 1; i < len; i++) {
		var arg = args[i];
		for (itm in arg) {
			if (arg.hasOwnProperty(itm)) 
				ret[itm] = arg[itm];
		}
	}
	
	return ret;
}


//テキストエンコード(Text Encoding)
//@Param - type:Array in Digit
//@return - type:String
gChart.textEncoding = function(){
	var ret = [], args = Array.prototype.slice.call(arguments);
	
	for (var i = 0, j = args.length; i < j; i++) {
		var data = [], arg = args[i];

		for (var n = 0, m = arg.length; n < m; n++)
			data.push(Math.round( parseFloat(arg[n]) * 100) / 100 );
		
		ret.push(data.join(','));
	}
	
	return 't:' + ret.join('|');
}


//簡易エンコード(Simple Encode)
//数値から簡易エンコード文字に変換
//@Param - type:int(0 - 61)
//@return - type:String - Simple Encoded Value
gChart.simpleEncode = function(data){
	return data < 0 ? '_' : simpleChrs.substr(data,1) || '_';
}


//@Param - type:Array(int:0 - 61)
//@return - type:Array - Simple Encoded Value
gChart.simpleEncoding = function(){
	var ret = [], args = Array.prototype.slice.call(arguments);
	
	for (var i = 0, j = args.length; i < j; i++) {
		var data = '', arg = args[i];

		for (var n = 0, m = arg.length; n < m; n++)
			data += this.simpleEncode( parseInt(arg[n]) );
		
		ret.push(data);
	}
	
	return 's:' + ret.join(',');
}


//拡張エンコード(Extended Encode)
//数値から拡張エンコード文字に変換
//@Param - type:int(0 - 4095)
//@return - type:String - Extended Encoded Value
gChart.extendedEncode = function(data){
	return data < 0 ? '__' : this.extendedEncodWords[data] || '__';
}


//@Param - data: type Array(int:0 - 4095)
//@return - Array of Extended Encoded Value
gChart.extendedEncoding = function(){
	var ret = [], args = Array.prototype.slice.call(arguments);
	
	for (var i = 0, j = args.length; i < j; i++) {
		var data = '', arg = args[i];
		
		for (var n = 0, m = arg.length; n < m; n++)
			data += this.extendedEncode( parseInt(arg[n]) );
		
		ret.push(data);
	}
	
	return 'e:' + ret.join(',');
}


//@Value - type:Array(string AA - ..)
gChart.extendedEncodWords = (function(){
	var chrs = extendedChrs.split(''), len = chrs.length, ret = [];
	
	for (var i = 0; i < len; i++) {
		for (var n = 0; n < len; n++) 
			ret.push(chrs[i] + chrs[n]);
	}
	
	return ret;
})();


//簡易デコード(Simple Decode)
//簡易エンコード文字から数値に変換
gChart.simpleDecode = function(v){
	return /[A-Za-z\d]/.test(v) ? simpleChrs.search(v) : v == '_' ? -1 : null;
}

//@Param - type:String
//@return - type:Array(int 0 - 61 or null)
gChart.simpleDecoding = function(data){
	data = /^s:.*$/.test(data) ? data.substr(2) : data;
	
	var dts = data.split(','), ret = [];
	
	for (var i = 0; i < dts.length; i++) {
		var ar = [], dt = dts[i];
		for (var n = 0, m = dt.length; n < m; n++) 
			ar.push(this.simpleDecode(dt.substr(n, 1)));
		
		ret.push(ar);
	}
	
	return ret.length == 1 ? ret[0] : ret;
}


//拡張デコード(Extended Decode)
//拡張エンコード文字から数値に変換
//@Param - type:String - Extended Charactor
//@return - type:int or null
gChart.extendedDecode = function(v){
	var re = /([A-Za-z\d\-\.])([A-Za-z\d\-\.])/.exec(v);
	
	return re ? extendedChrs.search(re[1] == '.' ? '\\.' : re[1]) * 64 + extendedChrs.search(re[2] == '.' ? '\\.' : re[2]) :
		v == '__' ? -1 : null;
}


//@Param - type:String
//@return - type:Array
gChart.extendedDecoding = function(data){
	data = /^e:.*$/.test(data) ? data.substr(2) : data;
	
	var dts = data.split(','), ret = [];
	
	for (var i = 0; i < dts.length; i++) {
		var ar = [], dt = dts[i];
		for (var n = 0, m = dt.length; n < m; n += 2) 
			ar.push(this.extendedDecode(dt.substr(n, 2)));
		
		ret.push(ar);
	}
	
	return ret.length == 1 ? ret[0] : ret;
}

$.gChart = gChart;
})(jQuery);