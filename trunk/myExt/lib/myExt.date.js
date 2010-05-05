// 閏年
/* 1. 西暦年が4で割り切れる年は閏年
   2. ただし、西暦年が100で割り切れる年は平年
   3. ただし、西暦年が400で割り切れる年は閏年 */
 
/*	3.はつまり、
	100で割り切れて400で割り切れないということはあり得ないので、
	100で割り切れても400で割り切れる場合は閏年である、という意味を含んでいる。
	ということは、
	その年が100で割り切れるが400で割り切れない場合は閏年ではないとも言える。*/

//その年の3/1 から 一日引いて、2/29 なら閏年
/*Date.prototype.isLeapYear = function(){
	var date = new Date(this.getFullYear(), 2, 1);
	date.setDate(date.getDate() - 1);
	return date.getDate() == 29;
};*/

/**
 * 閏年かを判定します。
 * @return {bool}
 */
Date.prototype.isLeapYear = function(){
	
	var year = this.getFullYear();
	
	return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
		? true
		: false;
	
	/* bad? year/2/29 */
	//return (new Date(this.getFullYear(), 1, 29)).getDate() === 29;
};

function pz(n){
	return n < 10 ? "0" + n : n;
}

Date.prototype.toUTCFormat = function () {
    return isFinite(this.valueOf()) ?
		   this.getUTCFullYear()   + '-' +
		pz(this.getUTCMonth() + 1) + '-' +
		pz(this.getUTCDate())      + 'T' +
		pz(this.getUTCHours())     + ':' +
		pz(this.getUTCMinutes())   + ':' +
		pz(this.getUTCSeconds())   + 'Z' : null;
};



Date.prototype.simpleFormat = function( delimiter ){
	delimiter = delimiter || "/";
	return [
		this.getFullYear(),
		this.getMonth() + 1,
	 	this.getDate()
	].join(delimiter);
};


/*
var
second = 1000,// => 1000ms = 1sec
minute = 60 * second,
hour   = 60 * minute,
day    = 24 * hour;
*/