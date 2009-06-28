/*@cc_on 
var doc = document;
eval('var document = doc');
@*/
var digit = parseInt('ff', 16);
var hx = (255).toString(16);

String.prototype.hex = function(){
  return parseInt(this, 16);
};

/*例）*/
//'ff'.hex();

//prototype.jsに
Object.extend(Number.prototype, {
  toColorPart: function() {
    var digits = this.toString(16);
    if (this < 16) return '0' + digits;
    return digits;
  }
});



function RGB2HTML(red, green, blue)
{
    var decColor = red + 256 * green + 65536 * blue;
    return decColor.toString(16);
}


/*
I was looking for a script to convert RGB to Hex,
I find your but when this script return HEX with "00",
I can't convert this in color without some tricks.
I made a new RGB to HEX script for you:
*/

function RGBToHex(rgb){
	var chr = "0123456789ABCDEF";
	return String(chr.charAt(Math.floor(rgb / 16))) + String(chr.charAt(rgb - (Math.floor(rgb / 16) * 16)));
}



function changeToColorCode(r, g, b){
	return ((((1 << 8) + r << 8) + g << 8) + b).toString(16).replace(/^1/, '#');
};

var c= changeToColorCode(126, 255, 32);

$(function(){
	$(".date-header").css({backgroundColor:c});
})	;



String.prototype.toDecimalFromHex = function(){
  return parseInt(this, 16);
};
String.prototype.ToHexString = function(){
  return this.toString(16);
};
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
}
Number.prototype.toHexString = function(){
	var digits = this.toString(16);
	if (this < 16) 
		return '0' + digits;
	return digits;
}

Color.getRgbString = function(r, g, b){
	return 'rgb(' + String(r) + ',' + String(g) + ',' + String(b) + ')';
}

function makeClojure(){
	var i = 0;
	return function(){
		return i++;
	}
}
