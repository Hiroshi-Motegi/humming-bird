/*@cc_on
var doc = document;
eval('var document = doc');
@*/

function printCode080621() {
var code = document.code080621.txt1.value;
if (!code) {
alert("コードを入力してください");
return;
}

var lang = document.code080621.lang.value;
if (!document.code080621.opt1.checked) {
lang += ":nogutter";
}

if (!document.code080621.opt2.checked) {
lang += ":nocontrols";
}

if (document.code080621.opt3.checked) {
lang += ":collapse";
}

if (document.code080621.opt4.checked) {
lang += ":showcolumns";
}

var num = document.code080621.txt2.value - 0;
if (!isNaN(num) && num > 1) {
lang += ":firstline[" + num + "]";
}

code = code.replace(/</g, "&lt;");
code = code.replace(/>/g, "&gt;");
code = "<pre name=\'code\' class=\'" + lang + "\'>\n" + code + "\n</pre>";

document.code080621.txt3.value = code;
}