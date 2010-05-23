;(function( undefined ){
var
proto = Array.prototype,
slice = proto.slice,
myExt = {
	average: function(){
		return this.sum() / this.length;
	},
	/**
	 * 要検討
	 * 配列を複製します。
	 * @return {Array}
	 */
	clone: function(){
		return this.concat();
		//return this.slice(0)
		//return Array.prototype.apply(null, this);
	},
	/**
	 * 配列内に指定した値が存在するかを返します。
	 * 
	 * @param  {Object} obj
	 * @param  {Number} index
	 * @return {boolean}
	 */
	contains: function( o /*, index */ ){
		return this.indexOf( o, arguments[1] || 0 ) !== -1;
	},
	every: function( fn /*, thisObject*/ ){
		var i  = 0,
		    j  = this.length,
		    to = arguments[1];
		
		for ( ; i < j ; i++ ) {
			if ( i in this && !fn.call(to, this[i], i, this) ) {
				return false;
			}
		}
		
		return true;
	},
	/**配列の最初の値を返します。
	 */
	first: function(){
		return this[0];
	},
	/**配列を線形化します。(linearize)
	 * @return {array} - 一元配列
	 * loop count:1E4
	 * firefox3.6 -  142ms
	 * chrome6    -  255ms
	 * msie8      - 1605ms
	 */
	flatten: function(){
		return this.reduce(function(a, b){
			return a.concat( b instanceof Array ? b.flatten() : b );
		}, []);
	},
	/**
	 * foreach function
	 * @param  {function} fn
	 * @return {array}    this
	 */
	forEach: function( fn ){
		var i = 0,
			j = this.length,
			m;
		
		do{
			m = this[i];
		}while( i < j && fn.call( m, i++, m ) !== false )
		
		return this;
	},
	grep:function( fn ){
		var i   = 0,
		    j   = this.length,
		    ret = [],
			c;
		
		for ( ; i < j ; i++ ) {
			c = this[i];
			if ( fn.call( c, i, c ) !== false ) {
				ret[ ret.length ] = c;
			}
		}
		
		return ret;
	},
	indexOf: function( obj /*, from*/ ){
		var len  = this.length,
		    from = arguments[1] || 0;
		
		if ( from < 0 ) {
			from += len;
		}
		
		for ( ; from < len ; from++ ) {
			if ( from in this && this[from] === obj ) 
				return from;
		}
		
		return -1;
	},
	insert: function( /* index, insert value... */ ){
		var args  = slice.call(arguments),
		    index = args.shift();
		
		return this.slice(0, index).concat( args, this.slice(index) );
	},
	/**
	 * 重複している値があるかをboolで返します。
	 * @return {boolean}
	 */
	isUniq: function(){
		var self = this.concat().sort(),
			i = self.length - 1;
		
		while ( i > 0 ) {
			if ( self[i--] === self[i] ) {
				return false;
			}
		}
		
		return true;
	},
	/*past
	 isUniq: function(){
	 	var i = 0, j = this.length - 1;
	 	
	 	for (; i < j;) {
	 		if (this.indexOf(this[i++], i) !== -1) {
	 			return false;
	 		}
	 	}
	 	
	 	return true;
	 },
	*/
	/**
	 * 配列の最後の値を返します。
	 */
	last: function(){
		return this[this.length - 1];
	},
	/**配列を線形化します。(flatten)
	 * @return {array} - 一元配列
	 * loop count:1E4
	 * firefox3.6 -  132ms
	 * chrome6    -  222ms
	 * msie8      - 1105ms
	 */
	linearize: function(){
		return function fn( ary ){
			var i = 0,
			    j = ary.length,
			    ret = [],
			    tmp;
			
			for ( ; i < j ; i++ ) {
				tmp = ary[i];
				ret = ret.concat( tmp instanceof Array ? fn(tmp) : tmp );
			}
			
			return ret;
		}( this );
	},
	/**
	 * map function
	 * @param  {function} fn
	 * @return {array}    this
	 */
	map: function( fn /*, that*/ ){
		var i    = 0,
		    j    = this.length,
		    ret  = new Array(j),
		    that = arguments[1];
		
		for( ; i < j ; i++ ){
			ret[i] = fn.call( that, this[i], i, this );
		}
		
		return ret;
	},
	/**
	 * 配列内の最大値を返します。
	 */
	max: function(){
		return Math.max.apply(null, this);
	},
	/**
	 * 配列をマージします。
	 * 非破壊的です。
	 */
	merge: function(){
		var args = slice.call(arguments),
			ret  = this.clone(),
			i    = 0,
			j    = args.length,
			tmp, arg, k, m;
		
		for ( ; i < j ; i++ ) {
			arg = args[i];
			tmp = ret.clone();
			k = 0;
			m = arg.length;
			for ( ; k < m ; k++ ) {
				if ( tmp.indexOf( arg[k] ) === -1 ) {
					ret[ ret.length ] = arg[k];
				}
			}
		}
		
		return ret;
	},
	/**
	 * 配列内の最小値を返します。
	 */
	min: function(){
		return Math.min.apply(null, this);
	},
	/**
	 * 
	 */
	parseColorCode:function(){
		return '#' + ( ( ( 0x100 + this[0] << 8 ) + this[1] << 8) + this[2]).toString(16).slice(1);
	},
	reduce: function(fun /*, initial*/){
		var i   = 0,
		    len = this.length,
			ret;
		
		if (len == 0 && arguments.length == 1) {
			return;
		}

		if (arguments.length > 1) {
			ret = arguments[1];
		}
		else {
			do {
				if ( i in this ) {
					ret = this[i++];
					break;
				}
				//if array contains no values, no initial value to return
				if ( ++i >= len ) {
					return;
				}
			}
			while ( true );
		}
		
		for ( ; i < len ; i++ ) {
			if (i in this) {
				ret = fun.call( null, ret, this[i], i, this );
			}
		}
		
		return ret;
	},
	/**
	 * 引数に一致する値を削除します。
	 * このメソッドは破壊的です。
	 */
	remove: function(){
		var args = slice.call(arguments),
			j    = args.length,
			i;
		
		while ( j-- ) {
			while ( ( i = this.indexOf( args[j] ) ) !== -1 ) {
				this.splice(i, 1);
			}
		}
		
		return this;
	},
	/**
	 * 指定したインデックスの要素を削除します。
	 * このメソッドは破壊的です。
	 * @param {number} index
	 */
	removeAt: function( index ){
		if( typeof index == "number" && !isNaN(index) ){
			this.splice( index, 1 );
		}
		return this;
	},
	replace: function( i, o ){
		var self = this.concat();
		self[i] = o;
		return self;
	},
	
	/**
	 * 与えられた関数によって実行されるテストに合格する要素が配列の中にあるかどうかをテストします。 
	 * @param {Function} fun
	 * @param {Object}   that - this object
	 */
	some: function( fun /*, that*/ ){
		var i    = 0,
		    j    = this.length,
		    that = arguments[1];
		
		for ( ; i < j ; i++ ) {
			if ( i in this && fun.call( that, this[i], i, this ) ) {
				return true;
			}
		}
		
		return false;
	},
	//push at first
	stack: function( o ){
		this.unshift(o);
		return this;
	},
	sum: function(){
		var i = this.length, ret = 0;
		while ( i-- ) {
			ret += this[i];
		}
		return ret;
	},
	/**
	 * 重複している値を削除します。
	 * @return {array}
	 */
	uniq : function(){
		var self = this.concat().sort(),
		    i    = 0;
		
		for( ; i < self.length - 1 ; ){
			if ( self[i] === self[i + 1] ) {
				self.splice( i, 1 );
			}else{
				i++;
			}
		}
		
		return self;
	}/*,
	uniq: function(){
		for( var i = 0; i < this.length - 1; ){
			if ( this.indexOf(this[i], i + 1 ) !== -1 ) {
				this.splice( i, 1 );
			}else{
				i++;
			}
		}
		return this;
	}*/
}, mName;

myExt.all     = proto.every || myExt.every;
myExt.each    = proto.forEach || myExt.forEach;
myExt.any     = proto.some || myExt.some;
myExt.filter  = proto.grep || myExt.grep;
myExt.include = proto.contains || myExt.contains;

for( mName in myExt ){
	if ( !proto[ mName ] ) {
		proto[ mName ] = myExt[ mName ];
	}
}
})();