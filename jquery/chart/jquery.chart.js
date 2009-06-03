(function($){
$.chart = {
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
					x.push( i + '=' + o[i] );
				}
				return x.join('&')
			})(op);
	},
	
	dataFormat: function(w, data){
		return 't:' + $.isArray(data) ? data.join(',') : data;
	},
	sizeFormat: function(w, h){
		return w + 'x' + h;
	},
	
	
	/*
	 * 簡易エンコード
	 * Simple Encode
	 */
	simpleEncode:function(v){
		var chr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		if(/[A-Za-z\d]/.test(v)){
			return chr.search(v);
		}
		return '_'
	},
	
	/*
	 * 拡張エンコード
	 * Extended Encode
	 */
	extendedEncode: function(v){
		var chr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.';
		var re;
		if(re = /([A-Za-z\d\-\.])([A-Za-z\d\-\.])/.exec(v)){
			//var r1 = re[1] == '.' ? '\\.' : re[1];
			//var r2 = re[2] == '.' ? '\\.' : re[2];
			return chr.search(re[1] == '.' ? '\\.' : re[1]) * 64 + chr.search(re[2] == '.' ? '\\.' : re[2]);
		}
		return '__';
	},
	
	/*
	 * テキストエンコードの範囲は 0 (0.0) から 100 (100.0)
	 * 0 ~ 100の範囲に収まるように数値をエンコードする
	 * @Param arr 数値の配列
	 */
	textEncoding:function(arr){
		var max = 0, min = 0;
		for (var i = 0; i < arr.length; i++) {
			max = Math.max(max, arr[i]);
			min = Math.min(min, arr[i]);
		}
		
		min = Math.abs(min);
		var x = (max + min)/100, nar =[];
		for (var i = 0; i < arr.length; i++) {
			nar.push(Math.max(Math.min((arr[i] + min)/x, 100), 0));
		}
		return nar;
	}
}
})(jQuery);