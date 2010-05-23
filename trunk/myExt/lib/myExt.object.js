(function(){
//my extention methods.
var
hasOwn = Object.prototype.hasOwnProperty,
slice = Array.prototype.slice,
myExt = {
	//create clone object
	clone: function(){
		var f = function(){};
		f.prototype = this;
		return new f;
	},
	forEach: function(fn){
		var name, item;
		
		for (name in this) {
			item = this[name];
			if (fn.call(item, name, item) === false) {
				break;
			}
		}
		
		return this;
	},
	// Merge Objects.
	merge: function(){
		var args = [this.clone()];
		
		args.concat( slice.call(arguments) );
		
		var len = args.length,
			ret = args[0],
			i   = 1,
			itm, arg;
		
		for ( ; i < len ; i++ ) {
			arg = args[i];
			for (itm in arg) {
				if ( arg.hasOwnProperty(itm) ) 
					ret[itm] = arg[itm];
			}
		}
		
		return ret;
	},
	
	// make Query String
	toQueryString: function(){
		var ret = [], i;
		
		for (i in this) {
			if (this.hasOwnProperty(i)) 
				ret[ret.length] = i + "=" + encodeURIComponent( this[i] );
		}
		
		return ret.join("&");
	},
	
	toArray: function(){
		return slice.call(this);
	},
	
	typeOf: function(){
		return typeof this;
	},
	
	instanceOf: function(klass){
		return this instanceof klass;
	},
	
	isConstructor: function(klass){
		return this.constructor === klass;
	}
};



for (var i in myExt) {
	if ( !(Object.prototype[i]) ) {
		Object.prototype[i] = myExt[i];
	}
}
})();