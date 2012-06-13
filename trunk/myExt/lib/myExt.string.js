/*!
 * JavaScript MyExtensions - String
 * Copyright 2010, y@s
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
;(function( undefined ){
var myExt = {
	/** 値が含まれているかを返します。
	 * @param  s {String}
	 * @return   {Boolean}
	 */
	contains: function( s ) {
        return this.indexOf( typeof s === "string" ? s : s.toString() ) !== -1;
    },
	/** 指定した位置に文字を挿入します。
	 * @param  i {Number} index
	 * @param  s {String} insert string
	 * @return   {String}
	 */
	insert: function( i, s ){
		return ( i < 0 || i > this.length )
			? this + ""
			: this.slice(0, i) + ( typeof s === "string" ? s : s.toString() ) + this.slice(i);
		//return s === null || s === undefined || isNaN(s)
		//	? this
		//	: this.slice(0, i) + s + this.slice(i);
	},
	/** 行数を返します.
	 * @return {Number} line count
	 */
	lineCount:function(){
		return this.split(/\n/).length;
	},
	random:function(n){
		return Math.random().toString(36).slice( -( Math.max( 0, Math.min(36, n) ) ) );
	},
	/** 文字列の文字ををソートします.
	 * @return {String}
	 */
	sort: function() {
        return Array.prototype.sort.apply( this.split(""), arguments ).join("");
    },
	/** 連続した文字を生成します。
	 * @param  n {Number} step count
	 * @return   {String}
	 */
	times: function( n ){
		var ret  = "",
		    self = this;
		
		for ( n = +n ; n > 0 ; n >>>= 1, self += self ) {
			if ( n & 1 ) 
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
		//[#]hhhhhh
		var ret = /^#?([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/.exec(this);
		
		if ( !ret ){
			//[#]hhh
			ret = /^#?([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/.exec(this);
			if ( ret ){
				ret[1] += ret[1];
				ret[2] += ret[2];
				ret[3] += ret[3];
			}else{
				return;
			}
		}
		return [ parseInt(ret[1],16), parseInt(ret[2],16), parseInt(ret[3],16) ];
	},
	/** 指定したインデックスの文字をユニコード(\uhhhh)形式文字に変換します。
	 * @param  index {Number} character index
	 * @return       {String} \uhhhh
	 */
	toUnicodeStringAt: function( index ){
		return "\\u" + ( 0x10000 + this.charCodeAt( index || 0 ) ).toString(16).slice(1);
	},
	/** ユニコード(\uhhhh)形式文字に変換します。
	 * @return {String} \uhhhh...
	 */
	toUnicodeString: function(){
		var i   = 0,
		    j   = this.length,
		    ret = "";
			
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
	toHexString: function(){
		var i   = 0,
		    j   = this.length,
		    ret = "";
		
		for( ; i < j ; i++ ){
			ret += this.toHexStringAt(i);
		}
		
		return ret;
	},
	/** 文字列の並びを反転します。
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
		return ( j < 1 ? "" : new Array( j + 1 ).join(c).slice(0, j) ) + this;
	},
	/* past
	padLeft: function( totalWidth, paddingChar ){
		return paddingChar.times(totalWidth - this.length) + this;
	}*/
	/**
	 * @param  w {Number} total width
	 * @param  c {String} padding char
	 * @return   {String}
	 */
	padRgiht: function( w, c ){
		var j = w - this.length;
		return this + ( j < 1 ? "" : new Array( j + 1 ).join(c).slice(0, j) );
	}/* past
	padRight: function( totalWidth, paddingChar ){
		return this + paddingChar.times(totalWidth - this.length);
	}*/
};


for( var i in myExt ){
	if( !(i in String.prototype) ){
		String.prototype[i] = myExt[i];
	}
}
})();