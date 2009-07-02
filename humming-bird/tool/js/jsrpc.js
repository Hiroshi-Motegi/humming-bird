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
			$.rpc.showResult("正規表現パターンに間違いがあるようです。");
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
		},
		test: function(pt, str){
			$.rpc.showResult(pt.test(str));
		},
		exec: function(pt, str){
			$.rpc.showResult(pt.exec(str));
		},
		search: function(pt, str){
			$.rpc.showResult(str.search(pt));
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


/*
$.showContent = function(callback){
	$.ajax({
		url: 'js/json.js',
		dataType: 'json',
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
			$('#tab-list li.tab').eq(6).css('margin-bottom', '20px');

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
*/



$.accordion = function( options ) {
	var opt = $.extend({
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
			$t.addClass('current').blur();
		}
		return false;
	});
	
	var $tglSpan = $($.my.slctr.tabListTglspan);
	$tglSpan.click(function(e){
		$tgls.eq($tglSpan.index(e.target)).trigger('click');
	});
	
	//高さの調整
	$.arrangeHeight();
}

$.arrangeHeight = function(){
	var h = $($.my.slctr.tabList).height();
	
	if ($.browser.msie && $.browser.version < 7)
		h += parseInt($($.my.slctr.tabList).css('margin-bottom').match(/\d+/));
	
	$($.my.slctr.pattrnCont).each(function(){
		if( $(this).height() < h )
			$(this).height(h);
	});
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


$.bindPastePattern = function(){
	$($.my.slctr.pattern).live('click', function(){
		$($.my.slctr.ptTxt).val($(this).text()).parent().flash();
		$(this).blur();
		return false;
	});
}


$.extend($.my.slctr,{
	tgt: '#txtr-target',
	lbl: 'label.exec-order-label',
	tabList: '#tab-list',
	tabListTgl: '#tab-list li.tab a',
	tabListTglspan: '#tab-list li.tab a span.ja',
	pattrnContWrap: '#content-right-wrap',
	pattrnCont:'#content-right-wrap .cont',
	pattern:'a.pattern',
	execBtn:'#exec',
	ptTxt:'#txt-pattern',
	reTxt:'#txt-replace',
	tgtTxtr:'#txtr-target',
	reTxtr:'#txtr-result',
	checkedOrder:'input.exec-order:checked'
});

})(jQuery);



jQuery(function($){	
	//$.showContent($.accordion);
	$.accordion();
	$.setLabelEffect();
	$($.my.slctr.tgt).val("abc 12.3 de -4あ5 f 6\ng,hi +78あ9\n01\t23 jklmn");
	$.bindExec();
	$.bindPastePattern();
	
	$.setTitle('Javascript Regular Expressions Pattern Check β', '1.3');
	
	if($.browser.msie && $.browser.version < 7){
		$('textarea').attr('rows', '9').height('90px');
	}
	
	
	/* json.jsは拡張子をjsonにしてMimeTypeをapplication/json にすべきか? */
});

