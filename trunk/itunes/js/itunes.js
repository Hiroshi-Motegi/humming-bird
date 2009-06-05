/*@cc_on 
var doc = document;
eval('var document = doc');
@*/

/* ---------------------------------------------------------------- */
function EDIT_STRING(str){
	var re = new Array(/\s?-\s(EP|Single)/,/(\(|\[|~|～).*(\)|\]|~|～)/g,/\s~.*$/,/~[^0-9]*$/,/^\s+|\s+$/g);
	var s = new String(str);
	for (var i = 0; i < re.length ; i++) {
		s = s.replace(re[i], "");
	}
	return s;
}

function Edit_PointUseAtTitle(str){
	var s = str.replace(/"/g, '&quot;');
	s = s.replace(/'/g, '&#39;');//『'』= &apos; or &#39;
	return s;
}
function Edit_PointUseAtHref(str){
	var s = str.replace(/"/g, "\\\"");
	s = s.replace(/'/g, "\\\'");
	return s;
}

function List_GetSelectedValue(id){
	try{
		el = document.getElementById(id);
		return el.options[el.selectedIndex].value;
	}catch (e) {}
}

function Set_CandG_Val(category, genre){
	with(document){
		getElementById("cddlst").value = category;
		getElementById("gddlst").value = genre;
	}
}


//-------------------------------------------------------------------------------
function EntryTitleElement() {
	this.initialize.apply(this, arguments);
}
EntryTitleElement.prototype = {
	Element: null,
	TitleAnchor: null,
	Toggle: null,
	
	initialize: function(entryTitle){
		
		this.Element = document.createElement("div");
		this.Element.className = "entryTitle";
		
		this.Toggle = (function(){
			var tglEl = document.createElement("span");
			tglEl.className = "titleToggle";
			if(List_GetSelectedValue("EntryVisiblityList") == "Title_Only"){
				tglEl.appendChild(document.createTextNode("▶"));
				tglEl.title = " Open";
			}else{
				tglEl.appendChild(document.createTextNode("▼"));
				tglEl.title = "Close";
			}
			return tglEl;
		})();
		
		
		var newTitleWord = (function(title){
			var str = new String(title);
			
			var re = new RegExp(/^[0-9]+\.\s/);
			if (str.match(re)){
				str = str.replace(str.substring(0,str.indexOf(" ")+1),"");
			}
			
			var arrStr = str.split(/\s-\s/);
			var SearchStr = "";
			
			for (nn = 0; nn < arrStr.length; nn++) {
				if (!arrStr[nn].match(/^(EP|Single|Various\s?Artists)$/g)) {
					if(nn != 0){SearchStr += " ";}
					SearchStr += arrStr[nn];
				}
			}
			return EDIT_STRING(SearchStr);
		})(entryTitle);
		
		
		this.TitleAnchor = document.createElement("a");
		this.TitleAnchor.title = "Keyword:[" + Edit_PointUseAtTitle(newTitleWord) + "] Go Search.";
		this.TitleAnchor.setAttribute("href", "javascript:gsInit(\'" + Edit_PointUseAtHref(newTitleWord) + "\');");
		this.TitleAnchor.appendChild(document.createTextNode(entryTitle));
		
		this.Element.appendChild(this.Toggle);
		this.Element.appendChild(this.TitleAnchor);
	}
};
//-------------------------------------------------------------------------------

function EntryContentElement() {
	this.initialize.apply(this, arguments);
}
EntryContentElement.prototype = {
	initialize: function(){
		this.Base = document.createElement("div");
		this.Base.className = "entryContent";
		if (List_GetSelectedValue("EntryVisiblityList") == "Title_Only") {
			this.Base.style.display = "none";
		}
		
		this.caCntnr = document.createElement("div");
		this.caCntnr.className = "coverart";
		
		var content = document.createElement("div");
		content.className = "content";
		
		var table = document.createElement("table");
		table.className = "contTable";
		this.eTbody = document.createElement("tbody");
		this.eTbody.className = "contTbody";
		
		var clear = document.createElement("div");
		clear.className = "clear";
		
		this.Base.appendChild(this.caCntnr);
		table.appendChild(this.eTbody);
		content.appendChild(table);
		this.Base.appendChild(content);
		this.Base.appendChild(clear);
	}
};
//-------------------------------------------------------------------------------



function CoverArtElement() {
	this.initialize.apply(this, arguments);
}
CoverArtElement.prototype = {
	Element: null,
	Image: null,
	initialize: function(){
		this.Element = document.createElement("a");
		this.Image = document.createElement('img');
		this.Element.appendChild(this.Image);
	},
	SetHref: function(al){
		this.Element.setAttribute("href", al);
	}
};
//-------------------------------------------------------------------------------
function xElement() {
	this.initialize.apply(this, arguments);
}
xElement.prototype = {
    initialize: function() {
		this.ParentElement = document.createElement("tr");
		this.ChildElementName = null;
		this.ChildElementContent = null;
    },
	CreateChildElementName: function(nt){
		with (this) {
			ChildElementName = document.createElement("td");
			ChildElementName.className = "eNametd";
			ChildElementName.appendChild(document.createTextNode(nt + " :"));
		}
	},
	CreateChildElementContent: function(){
		this.ChildElementContent = document.createElement("td");
		this.ChildElementContent.className = "eValuetd";
	},
	setTextToChildElementContent: function(txt){
		if (this.ChildElementContent == null) {this.CreateChildElementContent();}
		if(txt == "-¥1"){txt = "-"}
		this.ChildElementContent.appendChild(document.createTextNode(txt));
	},
	setAncTextToChildElementContent: function(txt){
		if (this.ChildElementContent == null) {this.CreateChildElementContent();}
		
		var Anc = document.createElement('a');
		Anc.appendChild(document.createTextNode(txt));
		ex = EDIT_STRING(txt);
		Anc.title = "Keyword:[" + Edit_PointUseAtTitle(ex) + "] Go Search";
		Anc.setAttribute("href", "javascript:gsInit(\'" + Edit_PointUseAtHref(ex) + "\');");
		
		this.ChildElementContent.appendChild(Anc);
	},
	addElement: function(tgt){
		with (this) {
			if (ChildElementName != null) {
				if (ChildElementContent == null) {
					ChildElementName.setAttribute("colSpan", "2");
				}
				ParentElement.appendChild(ChildElementName);
			}
			if (ChildElementContent != null) {
				if (ChildElementName == null) {
					ChildElementContent.setAttribute("colSpan", "2");
				}
				ParentElement.appendChild(ChildElementContent);
			}
			tgt.appendChild(ParentElement);
		}
	}
};
//-------------------------------------------------------------------------------
function xFeedURL() {
	this.initialize.apply(this, arguments);
}
xFeedURL.prototype = {
	URL: "",
    initialize: function(fc,fg) {
		var urlPart = {
			Top:"http://ax.phobos.apple.com.edgesuite.net/WebObjects/MZStore.woa/wpa/MRSS/",
			Country:"/sf=",			
			Genre:"/genre=",
			Limit:"/limit=",
			Tail:"/rss.xml"
		};
		
		var feedCategory = {
			0:"topsongs",
			1:"topalbums",
			2:"newreleases",
			3:"justadded",
			4:"featuredalbums"};
		
		this.URL = urlPart.Top + feedCategory[fc] + urlPart.Country + List_GetSelectedValue("CountryList") + urlPart.Limit + List_GetSelectedValue("EntryCountList");
		
		if (fg == 0) {
			this.URL +=  urlPart.Tail;
		}else{
			this.URL +=  urlPart.Genre + fg + urlPart.Tail;
		}
    }
};

function gfInit(fC,fG){
	
	var fURL = new xFeedURL(fC,fG);
	//カテゴリーとジャンルの値を保持するためにtextboxに書き出す
	Set_CandG_Val(fC,fG);//+ "/explicit=false"
	
	//取得したFeedの内容を表示するタグの取得
	FeedElement = document.getElementById("feed");
	
	var feed = new google.feeds.Feed(fURL.URL);
	
	feed.setNumEntries(-1);
	feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
	
	feed.load(function(result){
		if (!result.error) {
			
			//各フィードを格納するタグの生成と追加
			var FeedContainer = document.createElement("div");
			FeedContainer.className = "feedContainer";
			
			//フィードタイトルを取得
			var feedDescription = result.feed.description; 
			feedDescription = feedDescription.replace(/iTunes Store ?:/,"");
			
			//フィードタイトルを格納するタグの生成と追加
			var FeedTitle = document.createElement("h3");
			FeedTitle.id = "feedTitle";
			FeedTitle.innerHTML = feedDescription;
			FeedContainer.appendChild(FeedTitle);
			
			var ns = "http://phobos.apple.com/rss/1.0/modules/itms/";
				
			var covorArtSize = {
					small: 0,
				 midium: 1,
					large: 2
				};
				
			/* ----------------------------------------------------------------------------------- */
			for (var i = 0; i < result.feed.entries.length; i++) {
			
				var entry = result.feed.entries[i];
				var eNode = entry.xmlNode;
				
				//エントリーを格納するタグを追加
				var EntryElement = document.createElement("div");
				EntryElement.className = "entryElement";
				FeedContainer.appendChild(EntryElement);
				
				/* エントリータイトルの取得 & 表示処理 Start -------------------------------------------- */
				if (entry.title != null) {
					var etEl = new EntryTitleElement(entry.title);
					EntryElement.appendChild(etEl.Element);
				}/* エントリータイトルの取得 & 表示処理 End -------------------------------------------- */
				
				var Content_Selected = {
					TitleOnly:"Title_Only",
							Full:"Full_Contents"
				};
				
					
				//各エントリーの各情報を格納する要素の生成と追加
				var eBCE = new EntryContentElement();
				EntryElement.appendChild(eBCE.Base);
				
				/* 各エントリーの各情報を取得--------------------------------------------------------- */
				
				//カバーアート
				var caNodes = google.feeds.getElementsByTagNameNS(eNode, ns, "coverArt")[covorArtSize.large];
				if (caNodes != null) {
					var imgEl = new CoverArtElement();
					imgEl.Image.src = caNodes.firstChild.nodeValue;
					imgEl.SetHref(google.feeds.getElementsByTagNameNS(eNode, ns, "albumLink")[0].firstChild.nodeValue);
					eBCE.caCntnr.appendChild(imgEl.Element);
				}
				
				//その他エントリー
				var ck = ["album", "artist", "albumPrice", "releasedate", "rights"];
				var ek = ["Album", "Artist", "Price", "Release", "Copyright "];
				var cnd = new Array(ck.length);
				
				for (ni = 0; ni < cnd.length; ni++) {
					try {
						cnd[ni] = google.feeds.getElementsByTagNameNS(eNode, ns, ck[ni])[0];
					} catch (e) {}
					
					if (cnd[ni] != null) {
						var El = new xElement();
						with (El) {
							switch (ni) {
								case 0: case 1: case 2: case 3:
									CreateChildElementName(ek[ni]);
									switch (ni) {
										case 0: case 1:
											var tempArtist = cnd[ni].firstChild.nodeValue;
											if(tempArtist == "Various Artists"){
												setTextToChildElementContent(tempArtist);
											}else{
												setAncTextToChildElementContent(tempArtist);
											}
											break;
										case 2: case 3:
											setTextToChildElementContent(cnd[ni].firstChild.nodeValue);
											break;
									}
									break;
								case 4:
									try {
										var tmpCopyright = ek[ni] + cnd[ni].firstChild.nodeValue;
										setTextToChildElementContent(tmpCopyright);
										ChildElementContent.title = tmpCopyright;
										ChildElementContent.className = "cprght";
									} catch (e) {}
									break;
							}
							addElement(eBCE.eTbody);
						}
					}
				}/* 各エントリーの各情報を取得 End--------------------------------------------------------- */
			}
			//以前に表示していたものがあれば削除
			FeedElement.removeChild(FeedElement.firstChild);
			//ランキングコンテンツを表示
			FeedElement.appendChild(FeedContainer);
			
			
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






function initMenu() {
  $('#Menu ul').hide();
  $('#Menu ul:first').show();
  $('#Menu li a').click(
		function() {
			var checkElement = $(this).next();
			var ToggleChild = $(this).children();
			
			if(checkElement.is('ul')){
				if(!checkElement.is(':visible')){
					$('#Menu ul:visible').slideUp('normal', function(){ 
						var toggle = $(this).prev().children();
						$(toggle[0]).text("▶");
						$(toggle[1]).text("◀");
					});
					
					checkElement.slideDown('normal', function(){
						$(ToggleChild[0]).text("▼");
						$(ToggleChild[1]).text("▼");
					});
				}
			}  
		}
	);
}




$(function(){
// ------------------------------------------------------------------------
initMenu();
// ------------------------------------------------------------------------

$('.titleToggle').live("click", function(){
	var $_tgl = $(this);
	$(this).parent().next().slideToggle("normal",
		function(){
			if($(this).is(':visible')){
				$_tgl.attr({title: "Close"}).text("▼");
			}else{
				$_tgl.attr({title: "Open"}).text("▶");
			}
		});
});
// ------------------------------------------------------------------------
	$('select.ddLst').change(function(){
		gfInit($('#cddlst').val(), $('#gddlst').val());
	});
// ------------------------------------------------------------------------

	$.extend($.my.title,{
		ja: 'Keyword Search@iTunes Store Ranking Beta',
		en: 'Keyword Search@iTunes Store Ranking β'
	});
	$.my.ver = '1.1';
	
	$.setTitle($.my.title.en, $.my.ver);
	$.showLastModDate();
	
	gfInit(0,0); 
	gsInit('');
	
});
