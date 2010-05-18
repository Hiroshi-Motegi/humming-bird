(function( undefined ){
var myExt = {
	/** 連続した文字を生成します。
	 * @param  i {Number} index
	 * @param  s {Number} insert string
	 * @return   {string}
	 */
	insert: function( i, s ){
		return s === null || s === undefined || isNaN(s)
			? this
			: this.slice(0, i) + s + this.slice(i);
	},
	/** 連続した文字を生成します。
	 * @param  n {Number} step count
	 * @return   {string}
	 */
	times: function( n ){
		var ret = "", self = this;
		for (n = +n; n > 0; n >>>= 1, self += self) {
			if (n & 1) 
				ret += self;
		}
		return ret;
		//easy
		//return new Array(n + 1).join(this);
	},
	/** RGB array に変換します。
	 * @return {Array} [ red, green, blue ]
	 */
	toRGB:function(){
		//#ffcc99
		var ret = /^#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/.exec(this);
		
		if ( !ret ){
			//#fc9
			ret = /^#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/.exec(this);
			if ( ret ){
				ret[0] += ret[0];
				ret[1] += ret[1];
				ret[2] += ret[2];
			}else{
				return this;
			}
		}
		return [ parseInt(ret[1],16), parseInt(ret[2],16), parseInt(ret[3],16) ];
	},
	/** 指定したインデックスの文字をユニコード(\uhhhh)形式文字に変換します。
	 * @param  index {Number} character index
	 * @return       {String} \uhhhh
	 */
	toUnicodeStringAt: function( index ){
		return "\\u" + ( 0x10000 + this.charCodeAt( index || 0) ).toString(16).slice(1);
	},
	/** ユニコード(\uhhhh)形式文字に変換します。
	 * @return {String} \uhhhh...
	 */
	toUnicodeString: function(){
		var i = 0, j = this.length, ret = "";
		for( ; i < j ; i++ ){
			ret += this.toUnicodeStringAt(i);
		}
		return ret;
	},
	/** 指定したインデックスの文字を16進数(\xhh)形式文字に変換します。
	 * @param  index {Number} character index
	 * @return       {String} \xhh
	 */
	toHexStringAt: function ( index ){
		return "\x" + ( 0x100 + this.charCodeAt(index || 0) ).toString(16).slice(1);
	},
	/** 16進数(\xhh)形式文字に変換します。
	 * @return {String} \xhh...
	 */
	toUnicodeString: function(){
		var i = 0, j = this.length, ret = "";
		for( ; i < j ; i++ ){
			ret += this.toHexStringAt(i);
		}
		return ret;
	},
	/**
	 * 文字列の並びを反転します。
	 * @return {String}
	 */
	reverse: function(){
		return this.split("").reverse().join("");
	},
	/**
	 * @param   w {Number} total Width
	 * @param   c {String} padding Char
	 * @return    {String}
	 */
	padLeft: function( w, c ){
		var j = w - this.length;
		return j < 1 ? this : new Array(j + 1).join(c).slice(0, j) + this;
	},
	/**
	 * @param  w {Number} total width
	 * @param  c {String} padding char
	 * @return   {String}
	 */
	padRgiht: function( w, c ){
		var j = w - this.length;
		return this + ( j < 1 ? "" : new Array(j + 1).join(c).slice(0, j) );
	},
	/**行数を返します.
	 * @return {Number} line count
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