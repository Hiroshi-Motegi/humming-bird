/**
 * Javascript Date dateFormat
 * Copyright 2010
 * Released under the MIT and GPL licenses.
 * 
 * @Author     : y@s
 * @Version    : 1.0
 * @Published  : 2010/03/24
 * @LastUpdate : 2010/03/26
 * @Demo       : http://code.google.com/p/humming-bird/source/browse/trunk/misc/dateFormat.html
 */

/**
 * @param  {Number} totalWidth
 * @return {string}
 */
Number.prototype.padZero = function( len ){
	return ("" + this).length < len ? ((+((1 << len).toString(2)) + this) + "").slice(1) : "" + this;
};



(function( clientLanguage, undefined ){

clientLanguage = clientLanguage || "en";

var
toString = Date.prototype.toString,

//fixed format string
fixedFormats = {
	d: {
		en: "M/d/yyyy",
		ja: "yyyy/MM/dd"
	},
	D: {
		en: "dddd, MMMM dd, yyyy",
		ja: "yyyy年M月d日"
	},
	
	f: {
		en: "dddd, MMMM dd, yyyy h:mm tt",
		ja: "yyyy年M月d日 H:mm"
	},
	F: {
		en: "dddd, MMMM dd, yyyy h:mm:ss tt",
		ja: "yyyy年M月d日 H:mm:ss"
	},
	
	g: {
		en: "M/d/yyyy h:mm tt",
		ja: "yyyy/MM/dd H:mm"
	},
	G: {
		en: "M/d/yyyy h:mm:ss tt",
		ja: "yyyy/MM/dd H:mm:ss"
	},
	
	m: {
		en: "MMMM dd",
		ja: "M月d日"
	},
	M: {
		en: "MMMM dd",
		ja: "M月d日"
	},
	
	/*Round-trip date/time pattern
	o: {
		en: "yyyy-MM-ddTHH:mm:ss.fffzzz",
		ja: "yyyy-MM-ddTHH:mm:ss.fffzzz"
	},
	*/

	r: {
		en: "ddd, dd MMM yyyy HH:mm:ss GMT",
		ja: "ddd, dd MMM yyyy HH:mm:ss GMT"
	},
	R: {
		en: "ddd, dd MMM yyyy HH:mm:ss GMT",
		ja: "ddd, dd MMM yyyy HH:mm:ss GMT"
	},
	
	s: {
		en: "yyyy-MM-ddTHH:mm:ss",
		ja: "yyyy-MM-ddTHH:mm:ss"
	},
	
	t: {
		en: "h:mm tt",
		ja: "H:mm"
	},
	T: {
		en: "h:mm:ss tt",
		ja: "H:mm:ss"
	},
	
	u: {
		en: "yyyy-MM-dd HH:mm:ssZ",
		ja: "yyyy-MM-dd HH:mm:ssZ"
	},
	
	/*UTC Time
	 U: {
	 en: "dddd, MMMM dd, yyyy h:mm:ss tt",
	 ja: "yyyy年M月dd日 H:mm:ss"
	 },
	*/
	
	y: {
		en: "MMMM, yyyy",
		ja: "yyyy年M月"
	},
	Y: {
		en: "MMMM, yyyy",
		ja: "yyyy年M月"
	}
};

/**
 * @param  {string} pattern
 * @param  {string} language
 * @return {string}
 */
function format( date, pattern, language ){

	var
	week = [{
			en: "Sunday",
			ja: "日曜日"
		},{
			en: "Monday",
			ja: "月曜日"
		},{
			en: "Tuesday",
			ja: "火曜日"
		},{
			en: "Wednesday",
			ja: "水曜日"
		},{
			en: "Thursday",
			ja: "木曜日"
		},{
			en: "Friday",
			ja: "金曜日"
		},{
			en:"Saturday",
			ja:"土曜日"
	}],
	
	wsc = {
		en: 3,
		ja: 1
	},
	
	month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
	
	//return pattern.replace(/(yyyy|yy|MMMM|MMM|MM|%?(?!G)M(?!T)|dddd|ddd|dd|%?d|HH|H|hh|h|mm|%?m|ss|%?s|fff|ff|%?f|FFF|FF|%?F|tt|%?t|zzz|zz|z|gg)/g, function($1){
	return pattern.replace(/(yyyy|[Md]{2,4}|[hH]{1,2}|[ystmg]{2}|[fF]{2,3}|z{1,3}|%?[stmfFd]|%?(?!G)M(?!T))/g, function($1){
		
		var lang = language || clientLanguage, tmp;
		$1 = $1.replace('%','');
		
		switch ($1) {
		
			//Year
			case 'yyyy': //The year in four digits
				return date.getFullYear();
			case 'yy': //The year without the century
				return (date.getFullYear() + "").slice(2);
				
			//Month
			case 'MMMM': //The full name of the month
				var m = date.getMonth();
				return lang === "en" ? month[m] : ++m + "月";
			case 'MMM': //The abbreviated name of the month
				var m = date.getMonth();
				return lang === "en" ? month[m].slice(0, 3) : ++m;
			//Numeric Month
			case 'MM':
				return (date.getMonth() + 1).padZero(2);
			case 'M':
				return date.getMonth() + 1;
			
			//Week
			case 'dddd': //Week full name
				return week[ date.getDay() ][ lang ];
			case 'ddd': //Week short name
				return week[ date.getDay() ][ lang ].slice( 0, wsc[ lang ] );
			
			//Day - The day of the month
			case 'dd':
				return date.getDate().padZero(2);
			case 'd':
				return date.getDate();
			
			//Hour 24
			case 'HH':
				return date.getHours().padZero(2);
			case 'H':
				return date.getHours();
			//Hour 12
			case 'hh':
				return ((tmp = date.getHours() % 12) ? tmp : 12).padZero(2);
			case 'h':
				return ((tmp = date.getHours() % 12) ? tmp : 12);
			
			//Minute
			case 'mm':
				return date.getMinutes().padZero(2);
			case 'm':
				return date.getMinutes();
			
			//Second
			case 'ss':
				return date.getSeconds().padZero(2);
			case 's':
				return date.getSeconds();
				
			//Millisecond
			case 'fff':
			case 'ff':
			case 'f':
				return date.getMilliseconds().padZero(3).slice(0, $1.length);
			
			case 'FFF':
			case 'FF':
			case 'F':
				return date.getMilliseconds().padZero(3).slice(0, $1.length).replace(/0+$/,"");
			
			//AM/PM
			case 'tt':
				return (date.getHours() < 12) ? 'AM' : 'PM';
			case 't':
				return (date.getHours() < 12) ? 'A' : 'P';
				
			//GMT
			case 'zzz':
				tmp = -date.getTimezoneOffset() / 60;
				return (tmp >= 0 ? "+" : "") + tmp.padZero(2) + ":00";
			case 'zz':
				tmp = -date.getTimezoneOffset() / 60;
				return (tmp >= 0 ? "+" : "") + tmp.padZero(2);
			case 'z':
				tmp = -date.getTimezoneOffset() / 60;
				return (tmp >= 0 ? "+" : "") + tmp;
			
			//The period or era
			//Anno Domini   - A.D.
			//Before Christ - B.C.
			case 'gg':
				return (lang === "en") ? "D.C." : "西暦";
			
			default:
				return $1;
		}
	});
}


/**
 * @param  {string} pattern
 * @param  {string} language
 * @return {string}
 */
Date.prototype.toString = function( pattern, language ){
	if ( pattern !== undefined ) {
		var lang = pattern.match(/^r$/i) ? "en" : language || clientLanguage;
		
		return pattern.match(/^(d|D|f|F|g|G|m|M|r|R|s|t|T|u|y|Y)$/) ?
			format(this, fixedFormats[pattern][lang], lang) :
			format(this, pattern, lang) || toString.call(this, arguments);
	}else{
		 return toString.call(this, arguments);
	}
};


})( navigator["language"] ? navigator["language"] : navigator["userLanguage"] );