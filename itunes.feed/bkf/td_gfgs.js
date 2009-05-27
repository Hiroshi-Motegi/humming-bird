/*@cc_on 
var doc = document;
eval('var document = doc');
@*/

/* ---------------------------------------------------------------- */
function EDIT_STRING(str){
	var re = new Array(/\s?-\s(EP|Single)/,/(\(|\[|~|～).*(\)|\]|~|～)/g,/\s~.*$/,/~[^0-9]*$/,/^\s+|\s+$/g);
	editStr = str;
	for (ki in re) {
		editStr = editStr.replace(re[ki], "");
	}
	return editStr;
}

function Edit_PointUseAtTitle(str){
	editStr = str.replace(/"/g, '&quot;');
	editStr = editStr.replace(/'/g, '&#39;');//『'』= &apos; or &#39;
	return editStr;
}
function Edit_PointUseAtHref(str){
	editStr = str.replace(/"/g, "\\\"");
	editStr = editStr.replace(/'/g, "\\\'");
	return editStr;
}

//-------------------------------------------------------------------------------
function xETitleElement() {
	this.initialize.apply(this, arguments);
}
xETitleElement.prototype = {
	initialize: function(title){
		this.TitleElement = document.createElement("div");
		this.TitleElement.className = "entryTitle";
		this.Title = title;
		this.SearchWord = (function(title){
			var str = new String;
			str = title;
			
			re = RegExp(/^[0-9]+\.\s/);
			if (str.match(re)){
				str = str.replace(str.substring(0,str.indexOf(" ")+1),"");
			}
			
			var arrStr = str.split(/\s-\s/);
			var SearchStr = "";
			
			for (nn = 0; nn < arrStr.length; nn++) {
				if (arrStr[nn].match(/(^EP$|^Single$|^Various\s\s?Artists$)/) != true) {
					if(nn != 0){SearchStr += " ";}
					SearchStr += arrStr[nn];
				}
			}
			return SearchStr;
		})(this.Title);
		
		this.TitleToggle = (function(){
			var tglEl = document.createElement("span");
			tglEl.className = "titleToggle";
			if(List_GetSelectedValue("EntryVisiblityList") == "Title_Only"){
				tglEl.appendChild(document.createTextNode("▶"));
			}else{
				tglEl.appendChild(document.createTextNode("▼"));
			}
			return tglEl;
		})();
		
		var eStr = EDIT_STRING(this.SearchWord);
		var tAnc = document.createElement("a");
		tAnc.title = "Keyword:[" + Edit_PointUseAtTitle(eStr) + "] Go Search";
		tAnc.setAttribute("href", "javascript:OnLoad(\'" + Edit_PointUseAtHref(eStr) + "\');");
		tAnc.appendChild(document.createTextNode(this.Title));
		
		this.TitleElement.appendChild(this.TitleToggle);
		this.TitleElement.appendChild(tAnc);
	}
};

//-------------------------------------------------------------------------------

function gfInit(fC,fG){
	//取得したFeedの内容を表示するタグの取得
	container = document.getElementById("feed");
	
	var feed = new google.feeds.Feed("");
	
	feed.setNumEntries(-1);
	feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
	
	feed.load(function(result){
		if (!result.error) {
			var ns = "http://phobos.apple.com/rss/1.0/modules/itms/";
			for (var i = 0; i < result.feed.entries.length; i++) {
				var entry = result.feed.entries[i];
				var eNode = entry.xmlNode;
				cnd[ni] = google.feeds.getElementsByTagNameNS(eNode, ns, ck[ni])[0];
			}
		}
	});
}

function gsInit(queryWord) {
	var options = new GsearcherOptions();
	options.setExpandMode(GSearchControl.EXPAND_MODE_OPEN);
	
	var searchControl = new google.search.SearchControl();
	searchControl.addSearcher(new google.search.VideoSearch(),options);
	searchControl.addSearcher(new google.search.ImageSearch());
	searchControl.addSearcher(new google.search.WebSearch());
	searchControl.addSearcher(new google.search.NewsSearch());
	searchControl.draw(document.getElementById("Search"));
	searchControl.execute(queryWord);
}

$(function(){
	gfInit(0,0); 
	gsInit('');
	
	$('#Side-Wrap > h4.mnTitle').click(function(){
		var $tglChild = $(this).children();
		$(this).next().slideToggle('normal',function(){
			if($(this).css("display") == "none"){
				$($tglChild[0]).text("▶");$($tglChild[2]).text("◀");
			}else{
				$($tglChild[0]).text("▼");$($tglChild[2]).text("▼");
			}
		});
	});


// ------------------------------------------------------------------------
function xList() {
	this.initialize.apply(this, arguments);
}
xList.prototype = {
	initialize: function(){
		this.EC_Value = $('#EntryCountList').val();
		this.EV_Value = $('#EntryVisiblityList').val();
		this.CL_Value = $('#CountryList').val();
	}
};
// ------------------------------------------------------------------------

function xCG() {
	this.initialize.apply(this, arguments);
}
xCG.prototype = {
	initialize: function(){
		var cVal = $('#cddlst').val();
		var gVal = $('#gddlst').val();
	},
	Set_cVal: function(val){
		cVal = val;
	},
	Set_gVal: function(val){
		gVal = val;
	},
	Get_cVal: function(){
		return cVal;
	},
	Get_gVal: function(){
		return gVal;
	}
};
// ------------------------------------------------------------------------
	$('select.ddLst').change(function(){
		var cg = new xCG();
		gfInit(cg.Get_cVal(), cg.Get_gVal());
	});
// ------------------------------------------------------------------------
});

