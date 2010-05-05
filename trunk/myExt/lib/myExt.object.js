(function(){
//my extention methods.
var myExt = {

	//create clone object
	clone: function(o){
		var f = function(){};
		f.prototype = o;
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
		
		args.concat(Array.prototype.slice.call(arguments));
		
		var len = args.length,
			ret = args[0],
			i = 1,
			itm, arg;
		
		for (; i < len; i++) {
			arg = args[i];
			for (itm in arg) {
				if (arg.hasOwnProperty(itm)) 
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
		return Array.prototype.slice.call(this);
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
	if(i in Object.prototype)
		Object.prototype[i] = myExt[i];
}
})();