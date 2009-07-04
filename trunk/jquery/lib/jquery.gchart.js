/**
 * jQuery plugin gChart
 * Copyright 2009
 * Released under the MIT and GPL licenses.
 * 
 * Author:y@s
 * Version:1.0
 * Published:2009-07-02
 * Update:2009-07-02
 * Demo:http://humming-bird.googlecode.com/svn/trunk/jquery/demo/gchart.demo.html
 */

(function($){
$.gChart = function() {
	this.initialize.apply(this, arguments);
}

$.gChart.prototype = {
	initialize: function(options){
		this.params = $.gChart.merge($.gChart.defaults, options || {});
	},
	src: function(options){
	
		function toQueryString(o){
			var ret = [];
			for (var i in o) {
				if (o.hasOwnProperty(i)) 
					ret.push(i + '=' + encodeURIComponent(o[i]));
			}
			return ret.join('&');
		}
		
		return 'http://chart.apis.google.com/chart?' + toQueryString($.gChart.merge(this.params, options || {}));
		
	},
	image: function(options){
		return $(new Image()).attr('src', this.src(options));
	}
};


var
simpleChrs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
extendedChrs = simpleChrs + '-.';

$.extend($.gChart,{

	/*
	 * デフォルト
	 * Required Parameters
	 * - chart data
	 * - chart size
	 * - chart type
	 */
	defaults:{
		chd:'t:50,50',
		chs: '200x125',
		cht: 'p3'
	},
	
	merge:function(){

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

	},
	
	
	
	//テキストエンコードの範囲は 0 (0.0) から 100 (100.0)
	//0 ~ 100の範囲に収まるように数値を調整する
	//@Param - arr: type Array(int)
	textEncoding: function(data){
		var ret = [];
		for (var i = 0, len = data.length; i < len; i++)
			ret.push(Math.round(data[i] * 100) / 100);	
		
		return  't:' + ret.join(',');
	},
	
	
	//@Param - data: adjust value (type:Array)
	//@Param - min: Minimum value (type:int)
	//@Param - max: Maximum value (type:int)
	//@Param - gra: granularity (type:int)
	scaling: function(data, min, max, gra){
	
		var x, ret = [], len = data.length;
		
		min = min || 0;
		max = max || 0;
		gra = gra || 100;
		
		for (var i = 0; i < len; i++) {
			min = Math.min(min, data[i]);
			max = Math.max(max, data[i]);
		}
		
		min *= -1;
		
		x = (max + min) / gra;
		
		for (var i = 0; i < len; i++)
			ret.push(Math.round(Math.max(Math.min((data[i] + min) / x, gra), 0) * 100) / 100);
		
		return ret;
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
	simpleEncoding: function(data){
		var ret = 's:';
		for (var i = 0, j = data.length; i < j; i++) 
			ret += this.simpleEncode(Math.max(Math.min(Math.round(data[i]), 61), 0));
		
		return ret;
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
	extendedEncoding: function(data){
		var ret = 'e:';
		for (var i = 0, j = data.length; i < j; i++) 
			ret += this.extendedEncode(Math.max(Math.min(Math.round(data[i]), 4095), 0));
		
		return ret;
	},
	//@Value - type:Array(AA - ..)
	extendedEncodWords: (function(){
		var chrs = extendedChrs.split(''), ret = [];
		
		for (var i = 0, len = chrs.length; i < len; i++) {
			for (var k = 0; k < len; k++) 
				ret.push(chrs[i] + chrs[k]);
		}
		
		return ret;
	})(),
	
	
	
	// 簡易デコード(Simple Decode)
	//簡易エンコード文字から数値に変換
	simpleDecode: function(v){
		return /[A-Za-z\d]/.test(v) ? simpleChrs.search(v) : null;
	},
	//@return - type:Array
	simpleDecoding: function(data){
		var ret = [];
		
		if(/^s:.*$/.test(data))
			data = data.substr(2);
		
		for( var i = 0, j = data.length; i < j ; i++ )
			ret.push(this.simpleDecode(data.substr(i,1)));
		
		return ret;
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

		if(/^e:.*$/.test(data))
			data = data.substr(2);
		
		for( var i = 0, j = data.length; i < j ; i+=2 )
			ret.push(this.extendedDecode(data.substr(i,2)));
		
		return ret;
	},
	
	
	
	/* Cheat sheet 代わりに */
	
	//粒度
	granularity:{
		simple:61,
		extended:4095,
		text:100
	},
	
	//cht - チャート タイプ(chart type)
	//ex : cht=<chart type>
	chartType: {
		line: 'lc', //折れ線グラフ
		lineXY: 'lxy', //折れ線グラフ
		barHorizontal: 'bhs', //棒グラフ(横)
		barVertical: 'bvs', //棒グラフ(縦)
		barHorizontalGroup: 'bhg', //棒グラフ(横)グループ化
		barVerticalGroup: 'bvg', //棒グラフ(縦)グループ化
		pie: 'p', //円グラフ
		pie3D: 'p3', //円グラフ3D
		venn: 'v', //ベン図
		scatter: 's', //散布図
		sparkline: 'ls', //スパークライン
		radar: 'r', //レーダー(直線)
		radarCurved: 'rs', //レーダー(曲線)
		map: 't', //地図
		meter: 'gom', //Google-o-meter
		qrCode: 'qr' //QR コード
	},
	
	//chm - 図形マーカー / 範囲マーカー(marker type)
	//ex : chm=<marker type>
	markerType: {
		arrow: 'a', // 矢印
		circle: 'o', // 円
		cross: 'c', // 十字
		diamond: 'd', // ひし形
		lLine: 'h', // チャートを横断する水平線
		marker: 'r', // 範囲マーカー
		markerR: 'R', // 範囲マーカー
		square: 's', // 四角
		vLine: 'v', // x 軸からデータ ポイントまでの垂直線
		vLineTop: 'V', // チャート上端までの垂直線
		x: 'x' // 図形
	},
	
	//[chxt] - 軸ラベル表示指定
	label:{
	bottom:'x', // 下部の x 軸
	left:'y', // 左側の y 軸
	right:'r', // 右側の y 軸
	top:'t' // 上部の x 軸
	},
	
	//[chf] - 塗りつぶし(fill)
	fillTarget:{
		background:'bg',
		chartArea:'c',
		transparency:'a'
	},
	fillType:{
		 solidFill:'s', //単色塗りつぶし
		 linearGradient:'lg', //線形グラデーション
		 linearStripes:'ls' //線形ストライプ
	}
	
})})(jQuery);