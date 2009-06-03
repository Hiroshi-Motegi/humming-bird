/*@cc_on 
var doc = document;
eval('var document = doc');
@*/

var cs = {
	err_emptyMsg:"ページ中央のテキストエリアに対象文字列を入力して下さい。",
	func: function(){
	
		//置換対象文字列を取得
		var w = cs.getTargetString();
		
		//Validation
		if (cs.isEmpty(w)) {
			cs.showChangedString(cs.err_emptyMsg);
			$("#target").flash();
			return;
		}
		
		//指定した文字列を変換する
		w = cs.replaceString(w);
		//文字列を指定したタグで囲む
		w = cs.wrappingTag(w);
		
		//置換後の文字列を結果に表示する
		cs.showChangedString(w);
	},
	
	//対象文字列を取得し、返します。
	getTargetString: function(){
		return $("#target").val();
	},
	
	//置換後の文字列を結果(テキストエリア)に表示する
	showChangedString: function(s){
		$("#result").val(s);
	},
	
	isEmpty: function(s){
		return s == ""||s==undefined||s=='undefined'||s==null;
	},
	
	//置換を行う
	//Return: 置換後の文字列
	replaceString: function(s){

		//Tab → &nbsp; × space count
		if(document.getElementById("chk-tab").checked){
			var sc = $("#space-count").val();
			sc = (+sc == sc) ? sc : 1;
			var space = "";
			for (var i = 0; i < sc; i++) 
				space += "&nbsp;";
			
			s = s.replace(/\t/g, space);
		}
		
		//<> → &lt; &gt;
		if(document.getElementById("chk-ltgt").checked){
			s = s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
		}
		
		//" → &quot;
		if(document.getElementById("chk-quot").checked){
			s = s.replace(/"/g, "&quot;");
		}
		
		//' → &#39;
		if(document.getElementById("chk-singlequot").checked){
			s = s.replace(/'/g, "&#39;");
		}
		
		//\n → &lt;br/&gt;
		if(document.getElementById("chk-return").checked){
			s = s.replace(/\n/gm, "&lt;br/&gt;\n");
		}
		
		//各行頭空白 → &nbsp;
		if(document.getElementById("chk-blank").checked){
			s = cs.replaceBlank(s);
		}
		
		return s;
	},
	
	//各行頭にある空白(space)を"&nbsp;"に変換する
	replaceBlank: function(s){
		try {
			var str = s.split("\n");
			if (str != null && str.length > 0) {
				var tmp = "";
				for (var ni = 0; ni < str.length; ni++) {
					var re = str[ni].match(/^(?:[ 　])+/);
					if (re == null) {
						tmp += str[ni] + "\n";
					}
					else {
						var brankString = "";
						for (var i = 0; i < re[0].length; i++) {
							brankString += "&nbsp;";
						}
						tmp += str[ni].replace(/^\s+/g, brankString) + "\n";
					}
				}
				
				s = tmp.replace(/\n$/g, "");
			}
		} 
		catch (e) {}
		finally{ return s; }
	},
	
	//文字列を指定したタグで囲む
	wrappingTag: function(s){
		var to = cs.getTagOrder();
		if (to == "none") {
			return s;
		}
		var tg = cs.createTagString(to);
		return (tg[0] + s + tg[1]);
	},
	
	//対象文字列を囲むタグ文字列を生成し、返します。
	createTagString: function(op){	
		var tg = [,];
		
		switch (op) {
			case "none":
				tg[0] = "";
				tg[1] = "";
				break;
			case "blockquote":
				tg[0] = "<blockquote>\n";
				tg[1] = "\n</blockquote>";
				break;
			case "pre":
				tg[0] = "<pre>\n";
				tg[1] = "\n</pre>";
				break;
			case "prettify":
				tg[0] = "<pre class='prettyprint" + cs.getPrettifyLang() + "'>\n";
				tg[1] = "\n</pre>";
				break;
			case "SyntaxHighlighter":
				tg[0] = "<pre class='" + cs.getCodeName() + cs.getSHOptions() + "' name='code'>\n";
				tg[1] = "\n</pre>";
				break;
			default:
				tg[0] = "";
				tg[1] = "";
				break;
		}
		return tg;
	},
	
	//prettifyタグのclass属性にlang指定を行う
	getPrettifyLang:function(){
		var lang = $("input.rdo-pretty-lang:checked").val();
		if (lang != "none") {
			return " lang-" + lang;
		}else{
			return "";
		}
	},
	
	getSHOptions:function(){
		var opt = "";
		if(document.getElementById("sh-chk-nogutter").checked) opt += ":nogutter";
		if(document.getElementById("sh-chk-nocontrols").checked) opt += ":nocontrols";
		if(document.getElementById("sh-chk-collapse").checked) opt += ":collapse";
		if (document.getElementById("sh-chk-firstline").checked) {
			var num = $.trim($("#firstline-num").val());
			if(!num || num.match(/[^\d]/)) num = "1";
			opt += ":firstline[" + num + "]";
		}
		if(document.getElementById("sh-chk-showcolumns").checked) opt += ":showcolumns";
		return opt;
	},
	
	//囲むタグの指定情報を取得
	//指定しない場合はnoneが返る
	getTagOrder: function(){
		return $("input[type='radio'].rdo-tag:checked").val();
	},
	
	//SyntaxHighlighterのタグで使用するコード名を取得し、返します。
	//チェックされたラジオボタンのValueに格納された値を取得しています。
	getCodeName: function(){
		return $("input[type='radio'].rdo-code:checked").val();
	}
};


var vAct = {
	lbl_color:"#666666",
	lbl_hover_color:"#ffffff",
	lbl_selector:".lbl-chk,.lbl-tag,.lbl-code,.lbl-pretty-lang",
	lbl_hover_duration:400,
	bindLabelHoverAnimate: function(){
		$(vAct.lbl_selector).hover(function(){
			$(this).stop().animate({
				color: vAct.lbl_hover_color
			}, vAct.lbl_hover_duration);
		}, function(){
			$(this).stop().animate({
				color: vAct.lbl_color
			}, vAct.lbl_hover_duration);
		}).css({
			color: vAct.lbl_color
		});
	},
	
	
	radioTagSelector:"input[type=radio].rdo-tag",
	shid:"rdo-syntaxHighlighter",
	shTagSelector:"#wrap-synxhr-code",
	prttyid:"rdo-prettify",
	prttyTagSelector:"#wrap-prettify-lang",
	shDuration:"normal",
	bindShowRadioSHCode:function(){
		$(vAct.radioTagSelector).click(function(){
			if (document.getElementById(vAct.shid).checked) {
				//チェックされたらスライドして表示する。
				$(vAct.shTagSelector).slideDown(vAct.shDuration);
			}else{
				//チェックを外したらスライドして隠す。
				$(vAct.shTagSelector).slideUp(vAct.shDuration);
			}
			
			if (document.getElementById(vAct.prttyid).checked) {
				//チェックされたらスライドして表示する。
				$(vAct.prttyTagSelector).slideDown(vAct.shDuration);
			}else{
				//チェックを外したらスライドして隠す。
				$(vAct.prttyTagSelector).slideUp(vAct.shDuration);
			}
		});
	}
};


$(function(){
	vAct.bindLabelHoverAnimate();
	vAct.bindShowRadioSHCode();
	
	$("#btn-exec")
		.bind("click", cs.func)
		.mouseover(function(){
			$(this).flash("150%", {
				duration: 600
			});
		});
	
	//input[type=checkbox]
	$("#sh-chk-firstline").click(function(){
		$("#firstline-num").attr("disabled", !document.getElementById("sh-chk-firstline").checked);
	});
	
	//input[type=checkbox]
	$("#chk-tab").click(function(){
		$("#space-count").attr("disabled", !document.getElementById("chk-tab").checked);
	});
	
	$(".lastmod-date").text((function(date) {
	    return (date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate());
	})(new Date(document.lastModified)));
	
	$('#result').focus(function(){
		$(this).select();
	});
});
