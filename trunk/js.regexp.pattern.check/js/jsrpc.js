(function($){
$.rpc = {
	//Replace or Match function.
	fnc: function(){
		var word = $($.my.slctr.tgtTxtr).val();
		
		//Exist target string.
		if (!word) {
			$.rpc.showResult("対象文字列を入力して下さい。");
			return false;
		}
		
		var pattern = $($.my.slctr.ptTxt).val();
		
		//valid pattern.
		if ($.rpc.isRegexPattern(pattern)) {
			pattern = $.rpc.convertRegex(pattern);
		}
		else {
			$.rpc.showResult("Patternが正しくありません。");
			return false;
		}
		
		//Exec Replace or Match function.
		$.rpc.exec[$.rpc.getExecOrder()].call(this, pattern, word);
		return false;
	},
	
	showResult: function(s){
		$("#txtr-result").val(s);
	},
	getExecOrder: function(){
		return $($.my.slctr.checkedOrder).val();
	},
	exec: {
		match: function(pt, str){
			$.rpc.showResult(str.match(pt));
		},
		replace: function(pt, str){
			$.rpc.showResult(str.replace(pt, $($.my.slctr.reTxt).val()));
		}
	},
	isRegexPattern: function(pattern){
		return pattern.match(/^\/.+\/(?:[img]){0,3}$/);
	},
	convertRegex: function(s){
		var n = s.lastIndexOf('/'), pattern = s.substr(1, n - 1), flag = s.substr(n + 1, s.length);
		
		try {
			return new RegExp(pattern, flag);
		} 
		catch (e) {
			$.rpc.showResult(e.msg + "\nパターンが正しくありません。");
			return false;
		}
	}
};


$.showContent = function(callback){
	$.ajax({
		url: $.my.prop.contentUrl,
		dataType: "json",
		cache: false,
		success: function(data){
			
			var
			$tablist = $($.my.slctr.tabList),
			$bcRight = $($.my.slctr.pattrnContWrap),
			itms = data.items;

			for(var i = 0, j = itms.length; i < j; i++){
				var title = itms[i].title;
				$tablist.append('<li class="tab"><a href="javascript:void(0)">' + title.ja + ' - ' + title.en + '</a></li>');
				
				var
				cnts = itms[i].content,
				$cont = $('<div>').addClass('cont');
				
				for(var k = 0, m = cnts.length; k < m; k++){
					$('<div>')
						.addClass('pt-wrap')
						.html('<a href="javascript:void(0)" class="pattern">' + cnts[k].pt.$t + '</a>')
						.appendTo($cont);
					
					$('<dl>')
						.html(
							(function(dt){ return dt ? '<dt>' + dt + '</dt>' : '' })(cnts[k].dl.dt) +
							(function(dd){ return dd ? '<dd>' + dd.replace(/\n/g,'<br>') + '</dd>' : '' })(cnts[k].dl.dd)
						).appendTo($cont);
				}
				
				$bcRight.append($cont);
			}
			
			// 調整
			$('#tab-list li.tab').eq(5).css('margin-bottom', '20px');
			
			$('.cont:last').find('div.pt-wrap a.pattern').each(function(index, elm){
				var $t = $(elm);
				$t.before($('<span>')
					.addClass($t.attr('class'))
					.text($t.text())).remove();
			});
			// 調整 end
			
			if($.isFunction(callback)){callback.call()}
		}
	});
}

$.accordion = function( options ) {
	var opt = jQuery.extend({
		tglSelector:$.my.slctr.tabListTgl,
		contSelector:$.my.slctr.pattrnCont,
		duration:250
	},options),
	$conts = $(opt.contSelector),
	$tgls = $(opt.tglSelector);
	
	$conts.hide().filter(':first').show();
	$tgls.eq(0).addClass('current');

	$tgls.click( function(e) {
		var
		$t = $(e.target),
		$c = $conts.eq($tgls.index($t));
		
		if($c.is(':hidden')){
			$conts.filter(':visible').slideUp(opt.duration);
			$tgls.filter('.current').removeClass('current');
			$c.slideDown(opt.duration);
			$t.addClass('current');
			$t.blur();
		}
		return false;
	});
	
	//高さの調整
	$.arrangeHeight();
}

$.arrangeHeight = function(){
	var h = $($.my.slctr.tabList).height();
	if ($.browser.msie && $.browser.version <= 6) {
		h += parseInt($($.my.slctr.tabList).css('margin-bottom').match(/\d+/));
	}
	$($.my.slctr.pattrnCont).each(function(){
		if( $(this).height() < h ){
			$(this).height(h);
		}
	});
}

$.setTitle = function(){
	var pagetitle = $.my.prop.title.en + ' ver. ' + $.my.prop.ver;
	$($.my.slctr.title).text(pagetitle);
	$($.my.slctr.fTitle).text(pagetitle);
}

$.setText = function( value ) {
	$($.my.slctr.tgt).val(value);
}

$.setLabelEffect = function(){
	$($.my.slctr.lbl)
		.css('color', '#999')
		.hover(
			function(){$(this).stop(true).animate({color:'#fff'}, 250)},
			function(){$(this).stop(true).animate({color:'#999'}, 400)}
		);
}

$.bindExec = function(){
	var
	attrs = ['backgroundColor'],
	def_attrs = {},
	$exe = $($.my.slctr.execBtn);
	
	for(var i = 0; i < attrs.length; i++){
		def_attrs[attrs[i]] = $exe.css(attrs[i]);
	}
	
	$exe.click(function(){
		$(this).css(def_attrs).flash(attrs).blur();
		$.rpc.fnc();
		return false;
	});
}

$.fn.flash = function(attrs, options){
	var opt = $.extend({
		duration: 400,
		easing: 'swing',
		complete: function(){}
	},options);
	
	attrs = attrs || ['backgroundColor'];
	
	return this.each(function(){
		var def_attrs = {}, hi_attrs = {};
		
		if($.data(this, 'flash')){
			def_attrs = $.data(this, 'flash').def_attrs;
			hi_attrs = $.data(this, 'flash').hi_attrs;
		}else{
			for (var i = 0; i < attrs.length;i++) {
				def_attrs[attrs[i]] = $(this).css(attrs[i]);
				hi_attrs[attrs[i]] = $.modifyBrightness(def_attrs[attrs[i]], '+=20');
			}
			$.data(this, 'flash',{'def_attrs': def_attrs, 'hi_attrs': hi_attrs});
		}
		
		$(this).css(hi_attrs).animate(def_attrs, opt);
	});
}


$.bindPastePattern = function(){
	$($.my.slctr.pattern).live('click', function(){
		$($.my.slctr.ptTxt).val($(this).text()).parent().flash();
		$(this).blur();
		return false;
	});
}

$.attachEvent = function(evName, fn){
	evName = evName.toLowerCase();
	if (window.addEventListener) {
		window.addEventListener(evName, fn, false)}
	else if (window.attachEvent) {
		window.attachEvent('on' + evName, fn)
	}
}

$.showLastModDate = function(date){
	$.attachEvent('load', function(){
		$($.my.slctr.lastmod).text(
			(function(date){
				return date.getFullYear() + $.my.prop.dateDelimiter + (date.getMonth() + 1) + $.my.prop.dateDelimiter + date.getDate()
			})(new Date(document.lastModified))
		);
	});
}

$.my = {
	slctr: {
		title:'#title',
		fTitle:'#footer-page-title',
		tgt: '#txtr-target',
		lastmod: '#lastmod-date',
		lbl: 'label.exec-order-label',
		tabList: '#tab-list',
		tabListTgl: '#tab-list li.tab a',
		pattrnContWrap: '#content-right-wrap',
		pattrnCont:'#content-right-wrap .cont',
		pattern:'a.pattern',
		execBtn:'#exec',
		ptTxt:'#txt-pattern',
		reTxt:'#txt-replace',
		tgtTxtr:'#txtr-target',
		reTxtr:'#txtr-result',
		checkedOrder:'input.exec-order:checked'
	},
	prop: {
		title:{
			ja: 'Javascript 正規表現 パターン チェック Beta',
			en: 'Javascript Regular Expressions Pattern Check β'
		},
		ver: '1.3',
		dateDelimiter: '/',
		contentUrl: './js/json.js'
	}
};
})(jQuery);


(function(){
$(function(){	
	$.showContent($.accordion);
	$.setLabelEffect();
	$.setText("abc 12.3 de -4あ5 f 6\ng,hi +78あ9\n01\t23 jklmn");
	$.setTitle();
	$.bindExec();
	$.bindPastePattern();
	$.showLastModDate();
	//"12:34".replace(/(\d+):(\d+)/, "$1時$2分");
	if($.browser.msie){
		if ($.browser.version > 6) {
			$('textarea').attr('rows', '7');
		}else{
			$('textarea').attr('rows', '10').height('110px');
		}
	}
});
})(jQuery);

/*
$.fn.setData = function(key, val){
	return this.each(function(index, elm){
		$.data(elm, key, val);
	});
}

$.fn.getData = function(key){
	return $.map(this.each(function(index, elm){
		return $.data(elm, key);
	}));
}
*/