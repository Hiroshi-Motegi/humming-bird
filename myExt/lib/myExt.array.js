/*!
 * JavaScript MyExtensions - Array
 * Copyright 2010, y@s
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 * LastUpdate:2011-02-01
 */
;(function( undefined ){
var
proto = Array.prototype,
slice = proto.slice,
myExt = {
	/**
	 * 平均値を返します。
	 * @return {Number} 平均値
	 */
	average: function(){
		return this.sum() / this.length;
	},
	/**
	 * 配列を複製します。
	 * @return {Array}
	 */
	clone: function(){
		return this.concat();
		//return this.slice(0);
		//return Array.prototype.apply(null, this);
	},
	/**
	 * 配列内に指定した値が存在するかを返します。( include )
	 * 指定した要素がシーケンスに含まれている場合はtrue。それ以外はfalse。 
	 * @param  {Object} o
	 * @param  {Number} index - option
	 * @return {Boolean}
	 */
	contains: function( o /*, index */ ){
		return this.indexOf( o, arguments[1] || 0 ) !== -1;
	},
	/**
	 * シーケンスのすべての要素が条件を満たしているかを返します。( all )
	 * @param  {Function} predicate - 各要素が条件を満たしているかどうかをテストする関数。
	 * @param  {Object}   that      - this Object
	 * @return {Boolean}
	 */
	every: function( predicate /*, that*/ ){
		var i    = 0,
		    j    = this.length,
		    that = arguments[1];
		
		for ( ; i < j ; i++ ) {
			if ( i in this && !predicate.call( that, this[i], i, this ) ) {
				return false;
			}
		}
		
		return true;
	},
	/**
	 * 最初の値を返します。
	 * @return {Object}
	 */
	first: function(){
		return this[0];
	},
	/**
	 * 配列を線形化します。( linearize )
	 * @return {Array} - 一元配列
	 * 
	 * loop count:1E4
	 * firefox3.6 -  142ms
	 * chrome6    -  255ms
	 * msie8      - 1605ms
	 */
	flatten: function(){
		return this.reduce( function( a, b ) {
			return a.concat( b instanceof Array ? b.flatten() : b );
		}, [] );
	},
	/**
	 * foreach function
	 * 渡した関数でfalseを返すと処理を中断します。
	 * @param  {Function} fn
	 * @return {Array}    this
	 */
	forEach: function( fn ){
		var i = 0,
		    j = this.length,
		    m;

		do {
			m = this[i];
		} while ( i < j && fn.call( m, i++, m ) !== false )

		return this;
	},
	/**
	 * @param  {Number} indx
	 * @return {Object}
	 */
	get: function( indx ) {
		return indx < 0 ? this.slice(indx)[0] : this[indx];
	},
	/**
	 * @param  callback {Function}
	 * @param  inv      {Boolean}
	 * @return          {Array}
	 */
	grep: function( callback /*, inv*/ ) {
		var i   = 0,
		    j   = this.length,
		    ret = [],
		    inv = !arguments[1],
		    c;

		for (  ; i < j ; i++ ) {
			c = this[i];
			if ( inv !== !callback( c, i, c ) ) {
				ret[ret.length] = c;
			}
		}

		return ret;
	},
	/**
	 * @param  {Object} obj
	 * @param  {Number} from
	 * @return {Number}
	 */
	indexOf: function( obj /*, from*/ ){
		var len  = this.length,
		    from = arguments[1] || 0;
		
		if ( from < 0 ) {
			from += len;
		}
		
		for ( ; from < len ; from++ ) {
			if ( from in this && this[from] === obj ) {
				return from;
			}
		}
		
		return -1;
	},
	/**
	 * 指定した位置(index)に値を挿入します。
	 * @param  {Number} insert index
	 * @param  {Object} insert value...
	 * @return {Array}
	 */
	insert: function( /* index, insert value... */ ){
		var args  = slice.call(arguments),
		    index = args.shift();
		return this.slice(0, index).concat( args, this.slice(index) );
	},
	/**
	 * 指定した位置(index)に値を挿入します。
	 * 破壊的です。
	 * @param  {Number} index - insert index
	 * @param  {Object} obj   - insert value
	 * @return {Array}  this
	 */
	insertAt: function ( index, obj ) {
		this.splice( index, 0, obj );
		return this;
	},
	/**
	 * 指定した値(o2)の前にo1を挿入します。
	 * 破壊的です。
	 * @param  {Object} o1
	 * @param  {Object} o2
	 * @return {Array}
	 */
	insertBefore: function ( o1, o2 ) {
		var i = this.indexOf(o2);
		if ( i !== -1 ) {
			this.splice( i, 0, o1 );
		}
		return this;
	},
	/**
	 * 配列が空であるかを返します。
	 * @return {Boolean}
	 */
	isEmpty: function() {
		return this.length === 0;
	},
	/**
	 * 重複している値があるかを返します。
	 * @return {Boolean}
	 */
	isUniq: function(){
		var self = this.concat().sort(),
		    i    = self.length - 1;
		
		while ( i > 0 ) {
			if ( self[i--] === self[i] ) {
				return false;
			}
		}
		
		return true;
	},
	/*past isUniq
	 isUniq: function(){
	 	var i = 0, j = this.length - 1;
	 	
	 	for ( ; i < j; ) {
	 		if ( this.indexOf( this[i++], i ) !== -1 ) {
	 			return false;
	 		}
	 	}
	 	
	 	return true;
	 },
	*/
	/**
	 * 配列の最後の値を返します。
	 * @return {Object}
	 */
	last: function(){
		return this[this.length - 1];
	},
	/**
	 * @param  {Object} obj
	 * @param  {Number} fromIndex
	 * @return {Number}
	 */
	lastIndexOf: function ( obj /*, fromIndex */ ) {
		var len  = this.length,
			//↓ fromIndex (arguments[1]) は isNumber で0を許容すべきか?
		    from = arguments[1] || Math.max( 0, len - 1 );
		
		if ( from < 0 ) {
			from = Math.max( 0, len + from );
		}
		
		for ( ; from >= 0 ; from-- ) {
			if ( from in this && this[from] === obj ) {
				return from;
			}
		}
		
		return -1;
	},
	/**
	 * 配列を線形化します。( flatten )
	 * @return {Array} - 一元配列
	 * 
	 * loop count:1E4
	 * firefox3.6 -  132ms
	 * chrome6    -  222ms
	 * msie8      - 1105ms
	 */
	linearize: function(){
		return function fn( ary ){
			var i   = 0,
			    j   = ary.length,
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
	 * @param  {Function} fn
	 * @param  {Object}   that - this object
	 * @return {Array}
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
	 * @return {Object}
	 */
	max: function(){
		return Math.max.apply( null, this );
	},
	/**
	 * 配列をマージします。
	 * 非破壊的です。
	 * @return {Array}
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
			k   = 0;
			m   = arg.length;
			
			for ( ; k < m ; k++ ) {
				if ( tmp.indexOf( arg[k] ) === -1 ) {
					ret[ret.length] = arg[k];
				}
			}
		}
		
		return ret;
	},
	/**
	 * 配列内の最小値を返します。
	 * @return {}
	 */
	min: function(){
		return Math.min.apply( null, this );
	},
	/**
	 * カラーコードに変換して返します。
	 * e.g. [255,255,255] => "#FFFFFF"
	 */
	parseColorCode:function(){
		return "#" + ( ( ( 0x100 + this[0] << 8 ) + this[1] << 8 ) + this[2] ).toString(16).slice(1);
	},
	/**
	 * @param {Function} fun
	 * @param {Object}   initial
	 */
	reduce: function( fun /*, initial*/ ){
		var i   = 0,
		    len = this.length,
		    ret;
		
		if ( len == 0 && arguments.length == 1 ) {
			return;
		}

		if ( arguments.length > 1 ) {
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
	 * 破壊的です。
	 */
	remove: function( /* remove value... */ ){
		var args = slice.call(arguments),
		    j    = args.length,
		    i;
		
		while ( j-- ) {
			while ( ( i = this.indexOf( args[j] ) ) !== -1 ) {
				this.splice( i, 1 );
			}
		}
		
		return this;
	},
	/**
	 * 指定したインデックスの要素を削除します。
	 * 破壊的です。
	 * @param {Number} index
	 */
	removeAt: function( index ){
		if( typeof index == "number"
		    && !isNaN(index)
		    && index >= 0
		    && index < this.length ){
			this.splice( index, 1 );
		}
		return this;
	},
	/**
	 * 指定したインデックス(index)の値を渡された値(obj)に入れ替えます。
	 * @param  {Number} index
	 * @param  {Object} obj - replace value
	 * @return {Array} this
	 */
	replace: function( index, obj ){
		if ( this.length > index ) {
			this[ index < 0 && Math.abs(index) <= this.length ? this.length + index : index ] = obj;
		}
		return this;
	},
	/**
	 * 渡された関数によって実行されるテストに合格する要素が配列の中にあるかどうかをテストします。
	 * (渡された関数によってtrueと評価される値が存在するかを判定します。) 
	 * @param  {Function} fun
	 * @param  {Object}   that - this object
	 * @return {Boolean}
	 */
	some: function( fn /*, that*/ ){
		var i    = 0,
		    j    = this.length,
		    that = arguments[1];
		
		for ( ; i < j ; i++ ) {
			if ( i in this && fn.call( that, this[i], i, this ) ) {
				return true;
			}
		}
		
		return false;
	},
	/**
	 * 配列の先頭に値を追加します。
	 * 破壊的です。
	 * @param  {Object}
	 * @return {Array}
	 */
	stack: function(){
		var args = slice.call(arguments),
		    i    = args.length;
		
		while ( i-- ) {
			this.unshift( args[i] ); //push at first
		}
		
		return this;
	},
	/**
	 * 合計値を返します。
	 * 配列内の値が数値であることが前提です。
	 * @return {Number}
	 */
	sum: function(){
		var i = this.length, ret = 0;
		while ( i-- ) {
			ret += this[i];
		}
		return ret;
	},
	/**
	 * 重複している値を削除します。
	 * 引数にtrueと評価される値を渡すと破壊的、それ以外はコピーを作成し、返します。
	 * @return {Array}
	 */
	uniq:function( x ){
		var ary = x ? this : this.concat(),
		    i   = 0,
		    sameIndx;
		
		for( ; i < ary.length - 1; ){
			if ( ( sameIndx = ary.indexOf( ary[i], i + 1 ) ) !== -1 ) {
				ary.splice( sameIndx, 1 );
			}else{
				i++;
			}
		}
		
		return ary;
	}/*, past
	uniq: function(){
		var self = this.concat(),
		    i    = 0;
		
		for( ; i < self.length - 1; ){
			if ( self.indexOf(self[i], i + 1 ) !== -1 ) {
				self.splice( i, 1 );
			}else{
				i++;
			}
		}
		
		return self;
	}*/
}, mName;


myExt.all     = proto.every    || myExt.every;
myExt.any     = proto.some     || myExt.some;
myExt.copy    = proto.copy     || myExt.clone;
myExt.each    = proto.forEach  || myExt.forEach;
myExt.filter  = proto.grep     || myExt.grep;
myExt.include = proto.contains || myExt.contains;

for( mName in myExt ){
	if ( !proto[ mName ] ) {
		proto[ mName ] = myExt[ mName ];
	}
}
})();