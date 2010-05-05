(function( undefined ){
var myExt = {
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
	contains: function(obj /*, index */){
		return this.indexOf(obj, arguments[1] || 0) !== -1;
	},
	/**
	 * 配列を線形化します。(flatten)
	 * @return {array} - 一元配列
	 */
	flatten: function(){
		return this.reduce(function(a, b){
			if (b instanceof Array) {
				return a.concat(b.flatten());
			}
			else {
				return a.concat(b);
			}
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
			itm;
		
		do{
			itm = this[i];
		}while( i < j && fn.call(itm, i++, itm) !== false )
		
		return this;
	},
	grep:function(fn){
		var i = 0,
			j = this.length,
			ret = [], c;
			
		for (; i < j; i++) {
			c = this[i];
			if ( fn.call(c, i, c) !== false ) {
				ret[ret.length] = c;
			}
		}
		
		return ret;
	},
	
	/**
	 * 配列の最初の値を返します。
	 */
	first: function(){
		return this[0];
	},
	indexOf: function(obj /*, from*/){
		var len  = this.length,
			from = arguments[1] || 0;
		
		if (from < 0) 
			from += len;
		
		for (; from < len; from++) {
			if (from in this && this[from] === obj) 
				return from;
		}
		
		return -1;
	},
	insert: function(/* index, insert value... */){
		var args  = Array.prototype.slice.call(arguments),
			index = args.shift();
		
		return this.slice(0, index).concat(args, this.slice(index));
	},
	/**
	 * 重複している値があるかをboolで返します。
	 * @return {boolean}
	 */
	isUniq: function(){
		var self = this.concat().sort(),
			i = self.length - 1;
		
		while (i > 0) {
			if (self[i--] === self[i]) {
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
	/**
	 * 配列を線形化します。(flatten)
	 * @return {array} - 一元配列
	 */
	linearize: function(){
		return function fn(arr){
			var i = 0, j = arr.length, ret = [], tmp;
			
			for (; i < j; i++) {
				tmp = arr[i];
				ret = ret.concat( tmp instanceof Array ? fn(tmp) : tmp );
			}
			
			return ret;
		}(this);
	},
	/**
	 * map function
	 * @param  {function} fn
	 * @return {array}    this
	 */
	map: function( fn /*, that*/ ){
		var i = 0,
			j = this.length,
			ret = new Array(j),
			that = arguments[1];
		
		for( ; i < j ; i++ ){
			ret[i] = fn.call(that, this[i], i, this);
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
		var args = Array.prototype.slice.call(arguments),
			ret = this.clone(),
			i = 0,
			j = args.length,
			tmp, arg, k, m;
		
		for ( ; i < j ; i++ ) {
			arg = args[i];
			tmp = ret.clone();
			k = 0;
			m = arg.length;
			for ( ; k < m ; k++ ) {
				if ( tmp.indexOf(arg[k]) === -1 ) {
					ret[ret.length] = arg[k];
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
	reduce: function(fun /*, initial*/){
		var len = this.length, i = 0;
		
		if (len == 0 && arguments.length == 1) {
			return;
		}

		if (arguments.length >= 2) {
			var rv = arguments[1];
		}
		else {
			do {
				if (i in this) {
					rv = this[i++];
					break;
				}
				
				if (++i >= len) {
					return;
				}
			}
			while (true);
		}
		
		for (; i < len; i++) {
			if (i in this) 
				rv = fun.call(null, rv, this[i], i, this);
		}
		
		return rv;
	},
	/* , initial
	reduce: function(fun){
		var len = this.length >>> 0;
		if (typeof fun != "function") 
			throw new TypeError();
		
		// no value to return if no initial value and an empty array
		if (len == 0 && arguments.length == 1) 
			throw new TypeError();
		
		var i = 0;
		if (arguments.length >= 2) {
			var rv = arguments[1];
		}
		else {
			do {
				if (i in this) {
					var rv = this[i++];
					break;
				}
				
				// if array contains no values, no initial value to return
				if (++i >= len) 
					throw new TypeError();
			}
			while (true);
		}
		
		for (; i < len; i++) {
			if (i in this) 
				rv = fun.call(null, rv, this[i], i, this);
		}
		
		return rv;
	},
	*/
	/**
	 * 引数に一致する値を削除します。
	 * このメソッドは破壊的です。
	 */
	remove: function(){
		var args = Array.prototype.slice.call(arguments),
			j = args.length,
			i;
		
		while (j--) {
			while ((i = this.indexOf(args[j])) !== -1) {
				self.splice(i, 1);
			}
		}
		
		return this;
	},
	/**
	 * 指定したインデックスの要素を削除します。
	 * @param {Object} index
	 */
	removeAt: function( index ){
		this.splice( index || 0, 1 );
		return this;
	},
	
	/**
	 * 与えられた関数によって実行されるテストに合格する要素が配列の中にあるかどうかをテストします。 
	 * @param {Function} fun
	 * @param {Object}   thisp
	 */
	some: function(fun /*, thisp*/){
		var len = this.length;
		if (typeof fun != "function") 
			throw new TypeError();
		
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this && fun.call(thisp, this[i], i, this)) {
				return true;
			}
		}
		
		return false;
	},
	
	sum: function(){
		return this.reduce(function(a, b){
			return a + b;
		}, 0);
	},
	/**
	 * 重複している値を削除します。
	 * @return {array}
	 */
	uniq : function(){
		var self = this.concat().sort(), i = 0;
		
		for( ; i < self.length - 1; ){
			if ( self[i] === self[i + 1] ) {
				self.splice( i, 1 );
			}else{
				i++;
			}
		}
		
		return self;
	},
	uniq: function(){
		for( var i = 0; i < this.length - 1; ){
			if ( this.indexOf(this[i], i + 1 ) !== -1 ) {
				this.splice( i, 1 );
			}else{
				i++;
			}
		}
		return this;
	}
};

myExt.all     = Array.prototype.every || myExt.every;
myExt.each    = Array.prototype.forEach || myExt.forEach;
myExt.any     = Array.prototype.some || myExt.some;
myExt.filter  = Array.prototype.grep || myExt.grep;
myExt.include = Array.prototype.contains || myExt.contains;

for(var i in myExt){
	if (!Array.prototype[i]) {
		Array.prototype[i] = myExt[i];
	}
}
})();