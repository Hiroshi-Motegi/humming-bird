/*!
 * JavaScript MyExtensions - Date
 * Copyright 2010, y@s
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
/*
var
second = 1000, // 1sec == 1000ms
minute = 60 * second,
hour   = 60 * minute,
day    = 24 * hour;
*/
;(function( undefined ){
var
proto = Date.prototype,
myExt = {
	/**
	 * 閏年かを判定します。
	 * @return {Boolean}
	 */
	isLeapYear: function(){
		var year = this.getFullYear();
		return year % 4 == 0 && ( year % 100 != 0 || year % 400 == 0 )
			? true
			: false;
		/* 閏年
			1. 西暦年が4で割り切れる年は閏年
			2. ただし、西暦年が100で割り切れる年は平年
			3. ただし、西暦年が400で割り切れる年は閏年
		 
			3.はつまり、
			100で割り切れて400で割り切れないということはあり得ないので、
			100で割り切れても400で割り切れる場合は閏年である、という意味を含んでいる。
			ということは、
			その年が100で割り切れるが400で割り切れない場合は閏年ではないとも言える。
		
		-- その年の3/1 から 一日引いて、2/29 なら閏年 --
		Date.prototype.isLeapYear = function(){
			var date = new Date(this.getFullYear(), 2, 1);
			date.setDate(date.getDate() - 1);
			return date.getDate() == 29;
		};
		
		-- bad? --
		year/2/29
		Date.prototype.isLeapYear = function(){
			return (　new Date(this.getFullYear(), 1, 29)　).getDate() === 29;
		};*/
	},
	toUTCFormat: function(){
		function z(n){
			return n < 10 ? "0" + n : n;
		}
		
		return function () {
		    return isFinite( this.valueOf() )
				? this.getUTCFullYear()       + '-' +
				  z( this.getUTCMonth() + 1 ) + '-' +
				  z( this.getUTCDate()      ) + 'T' +
				  z( this.getUTCHours()     ) + ':' +
				  z( this.getUTCMinutes()   ) + ':' +
				  z( this.getUTCSeconds()   ) + 'Z'
				: null;
		};
	}(),
	/**
	 * simpleFormat
	 */
	simpleFormat: function( delimiter ){
		return [
			this.getFullYear(),
			this.getMonth() + 1,
		 	this.getDate()
		].join( delimiter !== undefined ? delimiter : '/' );
	}
}, mName;

for( mName in myExt ){
	if( !( mName in proto ) ){
		proto[mName] = myExt[mName];
	}
}

/**
 * now
 */
if ( !Date.now ){
	Date.now = function(){
		return +new Date;
	}
}
})();