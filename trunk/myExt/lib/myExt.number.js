(function( undefined ){
var
proto = Number.prototype,
myExt = {
	/**
	 * 差分を返します。
	 * @param  {Number} n
	 * @return {Number}
	 */
	diff: function( n ){
		return Math.max(this, n) - Math.min(this, n);
	},
	/**
	 * 数値を文字列に変換し、指定した文字列の長さになるよう左側に0を加えます。
	 * @param  {number} len - total width
	 * @return {string}
	 */
	padZero: function( len ){
		var self = this + "";
		return self.length < len ? ( ( +( (1 << len).toString(2) ) + this ) + "" ).slice(1) : self;
	},
	isNaN: function(){
		return isNaN(this);
	},
	times: function( fn ){
		for ( var i = 0 ; i < this ; i++ ) {
			fn.call( this, i, this );
		}
	},
	/**数値を2進数文字列に変換します。
	 * 引数によって文字列の長さを指定することができます。
	 * @param  {Object} length - option
	 * @return {String}
	 */
	toBinary: function( /* length */ ){
		var len = arguments[0] || 0, bin = this.toString(2);
		return bin.length < len ? ( (1 << len) + this ).toString(2).slice(1) : bin;
	},
	/**プリミティブ値に対応する文字(char)を返します。
	 * @return {string}
	 */
	toChar: function(){
		return String.fromCharCode(this);
	},
	toHex:function( n ){
		var hx = this.toString(16);
		return n > hx.length ? ( ( new Array(n + 1) ).join("0") + hx ).slice(-n) : hx;
	}
	/*too late.
	pow: function( exponent ){
		
		var base = this;
		
		for ( var ret = 1; exponent > 0; exponent >>>= 1, base *= base ) {
			if ( (exponent & 1) == 1 )
				ret *= base;
		}
		
		return ret;
		
		//return Math.pow( this, exponent );
	}
	*/
}, mName;

for( mName in myExt ){
	if( !( mName in proto ) ){
		proto[mName] = myExt[mName];
	}
}
})();