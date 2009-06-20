(function($){
$.gChart = {
	create: function(options){
	
		var op = $.extend({
			cht: 'p3', //type
			chd: 't:50,50', //data
			chs: '200x100' //size(pixel)
		}, options);
		
		return 'http://chart.apis.google.com/chart?' +
		(function(o){
			var x = [];
			for (var i in o) {
				if (o.hasOwnProperty(i)) 
					x.push(i + '=' + o[i]);
			}
			return x.join('&')
		})(op);
	},
	
	dataFormat: function(w, data){
		return 't:' + $.isArray(data) ? data.join(',') : typeof data === 'string' ? data : 'invalid data';
	},
	
	/*
	 * 簡易エンコード
	 * Simple Encode
	 */
	simpleEncode: function(v){
		var chr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		if (/[A-Za-z\d]/.test(v)) {
			return chr.search(v);
		}
		return '_'
	},
	
	
	/*
	 * 拡張エンコード
	 * Extended Encode
	 */
	extendedEncode: function(v){
		var
		chr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.',
		re = /([A-Za-z\d\-\.])([A-Za-z\d\-\.])/.exec(v);
		
		if (re) 
			return chr.search(re[1] == '.' ? '\\.' : re[1]) * 64 + chr.search(re[2] == '.' ? '\\.' : re[2]);
		
		return '__';
	},
	
	
	/*
	 * テキストエンコードの範囲は 0 (0.0) から 100 (100.0)
	 * 0 ~ 100の範囲に収まるように数値をエンコードする
	 * @Param arr 数値の配列
	 */
	textEncoding: function(arr){
		var max = 0, min = 0;
		for (var i = 0; i < arr.length; i++) {
			max = Math.max(max, arr[i]);
			min = Math.min(min, arr[i]);
		}
		
		min = Math.abs(min);
		var x = (max + min) / 100, nar = [];
		
		for (var i = 0; i < arr.length; i++) 
			nar.push(Math.max(Math.min((arr[i] + min) / x, 100), 0));
		
		return nar;
	},
	/*
	 //[cht] - チャート タイプ(chart type)
	 //example - 『cht=<chart type>』
	 */
	chartType: {
		line: 'lc', //折れ線グラフ
		lineXY: 'lxy', //折れ線グラフ
		bar: 'bhs',
		barHorizontal: 'bhs',
		barVertical: 'bvs',
		barHorizontalGroup: 'bhg',
		barGroup: 'bhg',
		barVerticalGroup: 'bvg',
		pie: 'p',
		pie3D: 'p3',
		venn: 'v',
		scatter: 's',
		sparkline: 'ls', //スパークライン
		radar: 'r',
		radarCurved: 'rs',
		map: 't',
		meter: 'gom',
		qrCode: 'qr'
	},
	
	// chm - 図形マーカー / 範囲マーカー(marker type)
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
		X: 'x' // 図形
	}
}
})(jQuery);