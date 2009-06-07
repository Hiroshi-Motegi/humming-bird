/*@cc_on 
var doc = document;
eval('var document = doc');
@*/

var cs = {
	err_emptyMsg:'ページ中央のテキストエリアに対象文字列を入力して下さい。',
	func: function(){
	
		//置換対象文字列を取得
		var w = cs.getTargetString();
		
		//Validation
		if (w == '') {
			cs.showChangedString(cs.err_emptyMsg);
			$('#target').flash();
			return false;
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
		return $('#target').val();
	},
	
	//置換後の文字列を結果(テキストエリア)に表示する
	showChangedString: function(s){
		$('#result').val(s);
	},
	
	//置換を行う
	//Return: 置換後の文字列
	replaceString: function(s){

		//Tab → &nbsp; × space count
		if($('#chk-tab').is(':checked')){
			var sc = $('#space-count').val();
			sc = (+sc == sc && sc > 0) ? parseInt( sc ) : 1;
			s = s.replace( /\t/g, this.strConcat( '&nbsp;' , sc ) );
		}
		
		//& → &amp;
		if($('#chk-amp').is(':checked'))
			s = s.replace(/&/g, '&amp;');
		
		//<> → &lt; &gt;
		if($('#chk-ltgt').is(':checked'))
			s = s.replace(/</g, '&lt;').replace(/>/g, '&gt;');
		
		//" → &quot;
		if($('#chk-quot').is(':checked'))
			s = s.replace(/"/g, '&quot;');
		
		//' → &#39;
		if($('#chk-singlequot').is(':checked'))
			s = s.replace(/'/g, '&#39;');
		
		//\ → \\;
		if($('#chk-bs').is(':checked'))
			s = s.replace(/\\/g, '\\\\');
		
		//\n → &lt;br/&gt;
		if($('#chk-return').is(':checked'))
			s = s.replace(/\n/gm, '&lt;br/&gt;\n');
		
		//空行の空白 → 削除
		if($('#chk-nullcol').is(':checked'))
			s = s.replace(/^\s+$/gm,'');
		
		//各行頭空白 → &nbsp;
		if($('#chk-blank').is(':checked'))
			s = cs.replaceBlank(s);
		
		return s;
	},
	
	removeSpace:function(s){
		/*
		var cols = s.split('\n');
		for(var i = 0, j = cols.length; i < j; i++)
			cols[i] = /[^\s]/g.test(cols[i]) ? cols[i] : '';
			//cols[i] = cols[i].replace(/\s/g,'') == '' ? '' : cols[i];
		return cols.join('\n');
		*/
	},
	
	strConcat: function (str, n){
	    var re = '';
	    for (n *= 1; n > 0; n >>>= 1, str += str) {
			if (n & 1) 
				re += str;
		}
	    return re;
	},
	
	//各行頭にある空白(space)を'&nbsp;'に変換する
	replaceBlank: function(s){
		
		if(s == '') return s;
		
		var str = s.split('\n'), tmp = [], regex = /^(?:[ 　])+/;
		
		for (var i = 0, j = str.length; i < j; i++) {
			var w = str[i], re;
			if (re = regex.exec(w)) {
				w = w.replace(regex, cs.strConcat('&nbsp;', re[0].length));
			}
			tmp.push(w);
		}
		
		return tmp.join('\n');
	},
	
	//文字列を指定したタグで囲む
	wrappingTag: function(s){
		var to = cs.getTagOrder();
		if (to == 'none') return s;
		var tg = cs.createTagString(to);
		return (tg[0] + s + tg[1]);
	},
	
	//対象文字列を囲むタグ文字列を生成し、返します。
	createTagString: function(op){	
		var tg = [,];
		
		switch (op) {
			case 'none':
				tg[0] = '';
				tg[1] = '';
				break;
			case 'blockquote':
				tg[0] = '<blockquote>\n';
				tg[1] = '\n</blockquote>';
				break;
			case 'pre':
				tg[0] = '<pre>\n';
				tg[1] = '\n</pre>';
				break;
			case 'prettify':
				tg[0] = '<pre class=\'prettyprint' + cs.getPrettifyLang() + '\'>\n';
				tg[1] = '\n</pre>';
				break;
			case 'SyntaxHighlighter':
				tg[0] = '<pre class=\'' + cs.getCodeName() + cs.getSHOptions() + '\' name=\'code\'>\n';
				tg[1] = '\n</pre>';
				break;
			default:
				tg[0] = '';
				tg[1] = '';
				break;
		}
		return tg;
	},
	
	//prettifyタグのclass属性にlang指定を行う
	getPrettifyLang:function(){
		var lang = $('input.rdo-pretty-lang:checked').val();
		if (lang == 'none') {
			return '';
		}else{
			return ' lang-' + lang;
		}
	},
	
	getSHOptions:function(){
		var opt = '';
		if(document.getElementById('sh-chk-nogutter').checked) opt += ':nogutter';
		if(document.getElementById('sh-chk-nocontrols').checked) opt += ':nocontrols';
		if(document.getElementById('sh-chk-collapse').checked) opt += ':collapse';
		if (document.getElementById('sh-chk-firstline').checked) {
			var num = $.trim($('#firstline-num').val());
			if(!num || num.match(/[^\d]/)) num = 1;
			opt += ':firstline[' + num + ']';
		}
		if(document.getElementById('sh-chk-showcolumns').checked) opt += ':showcolumns';
		return opt;
	},
	
	//囲むタグの指定情報を取得
	//指定しない場合はnoneが返る
	getTagOrder: function(){
		return $('input[type=\'radio\'].rdo-tag:checked').val();
	},
	
	//SyntaxHighlighterのタグで使用するコード名を取得し、返します。
	//チェックされたラジオボタンのValueに格納された値を取得しています。
	getCodeName: function(){
		return $('input[type="radio"].rdo-code:checked').val();
	}
};




(function($){
$.extend($.my.title,{
	ja: 'String Replace Beta',
	en: 'String Replace β'
});
$.my.ver = '1.4';

$.bindLabelHoverAnimate = function(selector, nParams, hParams, duration){
	var
	nPrms = $.extend({color:'#666'}, nParams),
	hPrms = $.extend({color:'#fff'}, hParams),
	duration = duration ? duration : 400;
	
	$(selector).hover(function(e){
		$(e.target).stop().animate(hPrms, duration);
	}, function(e){
		$(e.target).stop().animate(nPrms, duration);
	}).css(nPrms);
};

$.bindSlideOption = function(){
	var
	$wsyhr = $('#wrap-synxhr-code'),
	$wprty = $('#wrap-prettify-lang'),
	duration = 400;
	
	$('input[type=radio].rdo-tag').click( function(){
		if ($('#rdo-syntaxHighlighter').is(':checked')) {
			$wsyhr.slideDown(duration);
		}else{
			$wsyhr.slideUp(duration);
		}
		
		if ($('#rdo-prettify').is(':checked')) {
			$wprty.slideDown(duration);
		}else{
			$wprty.slideUp(duration);
		}
	});
}
})(jQuery);


jQuery(function($){
	$.bindLabelHoverAnimate('.lbl-chk,.lbl-tag,.lbl-code,.lbl-pretty-lang');
	$.bindSlideOption();
	
	$('#btn-exec').click(function(){
		$(this).blur().flash('170%', {duration: 600});
		cs.func();
	});
	
	
	$('#chk-tab').click(function(){
		$('#space-count').attr('disabled', !$(this).is(':checked'));
	});
	
	$('#sh-chk-firstline').click(function(){
		$('#firstline-num').attr('disabled', !$(this).is(':checked'));
	});
	
	$.setTitle($.my.title.en, $.my.ver);
	$.showLastModDate();
	
	$('#result').focus(function(){
		$(this).select();
	});
});