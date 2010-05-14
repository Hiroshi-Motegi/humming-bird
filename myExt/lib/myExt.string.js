(function( undefined ){
var myExt = {
	insert: function(i, o){
		return o !== null && o !== undefined && !isNaN(o)
			? this.slice(0, i) + o + this.slice(i)
			: this;
	},
	/** 連続した文字を生成します。
	 * @param  {Number} n
	 * 				step count
	 * @return {string}
	 */
	times: function(n){
		var ret = "", self = this;
		for (n = +n; n > 0; n >>>= 1, self += self) {
			if (n & 1) 
				ret += self;
		}
		return ret;
		//easy
		//return new Array(n + 1).join(this);
	},
	/** ユニコード(\uhhhh)形式文字に変換します。
	 * @param  {Number} index
	 * 				charactor index
	 * @return {String} (\uhhhh)
	 */
	toUnicodeStringAt: function( index ){
		return "\\u" + ( 0x10000 + this.charCodeAt( index || 0) ).toString(16).slice(1);
	},
	toUnicodeString: function( s ){
		var i = 0, j = s.length, ret = "";
		for( ; i < j ; i++ ){
			ret += this.toUnicodeStringAt(i);
		}
		return ret;
	},
	
	
	/** 16進数(\xhh)形式文字に変換します。
	 * @param  {Number} index
	 * 				charactor index
	 * @return {String} (\xhh)
	 */
	toHexStringAt: function ( index ){
		return "\x" + ( 0x100 + this.charCodeAt(index || 0) ).toString(16).slice(1);
	},
	/**
	 * 文字列の並びを反転します。
	 * @return {string}
	 */
	reverse: function(){
		return this.split("").reverse().join("");
	},
	/**
	 * @param  {Number} totalWidth
	 * @param  {String} paddingChar
	 * @return {String}
	 */
	padLeft: function(totalWidth, paddingChar){
		var len = totalWidth - this.length;
		return ( len < 1 ? "" : new Array(len + 1).join(paddingChar).slice(0, len) ) + this;
	},
	/**
	 * @param  {Number} totalWidth
	 * @param  {String} paddingChar
	 * @return {String}
	 */
	padRgiht: function(totalWidth, paddingChar){
		var len = totalWidth - this.length;
		return this + (len < 1 ? "" : new Array(len + 1).join(paddingChar).slice(0, len));
	},
	/**
	 * 行数を返します。
	 * @return {Number} - line count
	 */
	lineCount:function(){
		return this.split(/\n/).length;
	}
};


for( var i in myExt ){
	if( !(i in String.prototype) ){
		String.prototype[i] = myExt[i];
	}
}
})();