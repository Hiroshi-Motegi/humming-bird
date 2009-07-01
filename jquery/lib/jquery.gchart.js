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
	initialize:function(options){
		this.params = $.gChart.merge(this.defaults, options);
	},
	src: function(options){
		
		function toQueryString(o){
			var ret = [];
			for(var i in o){
				if(o.hasOwnProperty( i ))
					ret.push( i + '=' + encodeURIComponent(o[i]) );
			}
			return ret.join('&');
		}
		
		return 'http://chart.apis.google.com/chart?' + toQueryString($.gChart.merge(this.params, options));
	},
	image:function(options){
		var img = new Image();
		img.src = this.src(options);
		return img;
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
	//@Param arr - type:Array(int)
	textEncoding: function(data, min, max){	
		return  't:' + this.adjust(data, min, max, 100).join(',');
	},
	
	
	//@Param data:adjust target value (type:Array)
	//@Param min:Minimum value (type:int)
	//@Param max:Maximum value (type:int)
	//@Param gra:granularity (type:int)
	adjust: function(data, min, max, gra){
		
		var x, ret = [], len = data.length;
		
		min = min || 0;
		max = max || 0;
		gra = gra || 100;
		
		for ( var i = 0; i < len ; i++ ) {
			min = Math.min(min, data[i]);
			max = Math.max(max, data[i]);
		}
		
		min = Math.abs(min);
		
		x = (max + min) / gra;
		
		for (var i = 0; i < len; i++)
			ret.push(Math.min((data[i] + min)/x, gra));
		
		return ret;
	},
	

	//簡易エンコード(Simple Encode)
	// 数値から簡易エンコード文字に変換
	simpleEncode: function(data){
		return data < 0 ? '_' : simpleChrs.substr(data,1) || '_';
	},
	//@Param data - type:Array(int:0 - 61)
	simpleEncoding: function(data){
		var ret = 's:';
		for (var i = 0, j = data.length; i < j; i++)
			ret += this.simpleEncode(parseInt(data[i]));
		
		return ret;
	},
	
	
	//拡張エンコード(Extended Encode)
	//数値から拡張エンコード文字に変換
	extendedEncode: function(data){
		return data < 0 ? '__' : this.extendedEncodWords[data] || '__';
	},
	//@Param data - type:Array(int:0 - 4095)
	extendedEncoding: function(data){
		var ret = 'e:';
		for (var i = 0, j = data.length; i < j; i++)
			ret += this.extendedEncode(parseInt(data[i]));
		
		return ret;
	},
	extendedEncodWords: (function(){
		var
		chrs = extendedChrs.split(''),
		len = chrs.length,
		ret = [];
	
		for (var i = 0; i < len ; i++) {
			for (var k = 0; k < len ; k++) 
				ret.push(chrs[i] + chrs[k]);
		}
	
		return ret;
	})(),
	
	
		
	// 簡易デコード(Simple Decode)
	//簡易エンコード文字から数値に変換
	simpleDecode: function(v){
		return /[A-Za-z\d]/.test(v) ? simpleChrs.search(v) : null;
	},
	// return type:Array
	simpleDecoding: function(data){
		var ret = [], d = /^s:.+$/.test(data) ? data.substr(2) : data;
		for( var i = 0, j = d.length; i < j ; i++ )
			ret.push(this.simpleDecode(d.substr(i,1)));
		
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
	// return type:Array
	extendedDecoding: function(data){
		var ret = [], d = /^e:.+$/.test(data) ? data.substr(2) : data;
		
		for( var i = 0, j = d.length; i < j ; i += 2 )
			ret.push(this.extendedDecode(d.substr(i, 2)));
		
		return ret;
	},
	
	
	granularity:{
		simple:62,
		extended:4096,
		text:100
	},
	
	//cht - チャート タイプ(chart type)
	//example - 『cht=<chart type>』
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
	markerType: {
		arrow: 'a', // 矢印
		circle: 'o', // 円
		cross: 'c', // 十字
		diamond: 'd', // ひし形
		lLine: 'h', // チャートを横断する水平線
		marker: 'r', // 範囲マーカー r or R
		square: 's', // 四角
		vLine: 'v', // x 軸からデータ ポイントまでの垂直線
		vLineTop: 'V', // チャート上端までの垂直線
		x: 'x' // 図形
	},
	
	
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