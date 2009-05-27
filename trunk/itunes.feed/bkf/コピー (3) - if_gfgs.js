function Edit_Word(tgtStr){
	editStr = tgtStr.replace(/\s?-\s(EP|Single)/, "");
	editStr = editStr.replace(/(\(|\[|~|～).*(\)|\]|~|～)/g, "");
	editStr = editStr.replace(/\s~.*$/, "");
	editStr = editStr.replace(/~[^0-9]*$/, "");
	editStr = editStr.replace(/^\s+|\s+$/g, "");
	return editStr;
}

function edit_point(tgtStr){
	editStr = tgtStr.replace(/"/g, "\\\"");
	editStr = editStr.replace(/'/g, "\\\'");
	return editStr;
}

function Content_Clear(tgtPID){
	try {
		var tgtParent=document.getElementById(tgtPID);
		var tgt_firstchild=tgtParent.firstChild;
		
		while (tgt_firstchild.nextSibling){
			tgtParent.removeChild(tgt_firstchild.nextSibling);
		}
		
		tgtParent.removeChild(tgt_firstchild);
	} catch (e) {} 
}

function List_GetSelectedValue(id){
	try{
			element = document.getElementById(id);
			return element.options[element.selectedIndex].value;
		}catch (e) {}
}

function Set_CandG_Val(cVal,gVal){
	with(document){
		getElementById("categoryVal").value = cVal;
		getElementById("genreVal").value = gVal;
	}
}

function List_SelectedValue_Changed(){
	with (document) {
		cVal = getElementById("categoryVal").value;
		gVal = getElementById("genreVal").value;
	}
	initialize(cVal, gVal);
}

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
			ChildElementName.className = "name_td";
			ChildElementName.appendChild(document.createTextNode(nt + " :"));
		}
	},
	CreateChildElementContent: function(){
		this.ChildElementContent = document.createElement("td");
	},
	setTextToChildElementContent: function(txt){
		if (this.ChildElementContent == null) {this.CreateChildElementContent();}
		this.ChildElementContent.appendChild(document.createTextNode(txt));
	},
	setAncTextToChildElementContent: function(txt){
		if (this.ChildElementContent == null) {this.CreateChildElementContent();}
		
		var Anc = document.createElement('a');
		Anc.appendChild(document.createTextNode(txt));
		ex = Edit_Word(txt);
		Anc.title = "Keyword:[" + ex + "] Go Search";
		Anc.setAttribute("href", "javascript:OnLoad(\'" + edit_point(ex) + "\');");
		
		this.ChildElementContent.appendChild(Anc);
	},
	addElement: function(tgt){
		with (this) {
			if (ChildElementName != null) {
				ParentElement.appendChild(ChildElementName);
			}
			if (ChildElementContent != null) {
				ParentElement.appendChild(ChildElementContent);
			}
			tgt.appendChild(ParentElement);
		}
	}
};//-------------------------------------------------------------------------------


function initialize(fCategory,fGenre){
	
	var feedurlstrct = {
		Top:"http://ax.phobos.apple.com.edgesuite.net/WebObjects/MZStore.woa/wpa/MRSS/",
		Country:"/sf=",
		Tail:"/rss.xml",
		Genre:"/genre=",
		Limit:"/limit="
	};
	
	var feedCategory = Array();
	feedCategory[0] = "topsongs";
	feedCategory[1] = "topalbums";
	feedCategory[2] = "newreleases";
	feedCategory[3] = "justadded";
	feedCategory[4] = "featuredalbums";
	
	//カテゴリーとジャンルの値を保持するためにtextboxに書き出す
	Set_CandG_Val(fCategory,fGenre);
	
	//ドロップダウンリストからエントリー取得数を取得する
	var entryLimit = List_GetSelectedValue("EntryCountList");
	//ドロップダウンリストから国を取得する
	var countryNum = List_GetSelectedValue("CountryList");
	//ドロップダウンリストからコンテンツの表示形式の指定を取得
	var contentValueSelect = List_GetSelectedValue("EntryVisiblityList");
	
	//FeedURLを生成する
	var FeedURL = feedurlstrct.Top + feedCategory[fCategory] + feedurlstrct.Country + countryNum + feedurlstrct.Limit + entryLimit;
	if (fGenre == 0) {
		FeedURL +=  feedurlstrct.Tail;
	}else{
		FeedURL +=  feedurlstrct.Genre + fGenre + feedurlstrct.Tail;
	}
	//+ "/explicit=false"
	
	//取得したFeedの内容を表示するタグの取得
	container = document.getElementById("feed");
		
	var feed = new google.feeds.Feed(FeedURL);
	
	feed.setNumEntries(entryLimit);
	feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
	
	feed.load(function(result){
		if (!result.error) {
			
			/*@cc_on 
			var doc = document;
			eval('var document = doc');
			@*/
			
			//各フィードを格納するタグの生成と追加
			var containerDiv = document.createElement("div");
			containerDiv.className = "feedcontainer";
			
			//フィードタイトルを取得
			var feedDescription = result.feed.description; 
			feedDescription = feedDescription.replace(/iTunes Store ?:/,"");
			
			//フィードタイトルを格納するタグの生成と追加
			var FeedTitle = document.createElement("h3");
			FeedTitle.className = "feedtitle";
			FeedTitle.innerHTML = feedDescription;
			containerDiv.appendChild(FeedTitle);
			
			var ns = "http://phobos.apple.com/rss/1.0/modules/itms/";
			var sapiCallStr = {
				Top:"javascript:OnLoad(\'",
				End:"\');"
				};
			var ancTitleStr = {
				Top:"Keyword:[",
				End:"] Go Search"
				};
				
			var covorArtSize = {
					small: 0,
				 midium: 1,
					large: 2
				};
			
			var Content_Selected = {
				TitleOnly:"Title_Only",
						Full:"Full_Contents"
				};
				
			/* ----------------------------------------------------------------------------------- */
			
			for (var i = 0; i < result.feed.entries.length; i++) {
			
				var entry = result.feed.entries[i];
				var eNode = entry.xmlNode;
				
				//エントリーを格納するタグを追加
				var entryContainer = document.createElement("div");
				entryContainer.className = "entryCont";
				containerDiv.appendChild(entryContainer);
				
				/* エントリータイトルの取得 & 表示処理 Start */
				if (entry.title != null) {
					try {
						var entryHeader = document.createElement("div");
						entryHeader.className = "entryTitle";
						
						var str = new String;
						str = entry.title;
						
						re = RegExp(/^[0-9]+\.\s/);
						if (str.match(re)){
							rankNum = str.substring(0,str.indexOf(" ")) ;//rankNum = RegExp.lastMatch ;
							str = str.replace(rankNum,"");
							entryHeader.appendChild(document.createTextNode(rankNum));
						}
						
						arr_et = str.split(/\s\-\s/);
						
						for (etcnt = 0; etcnt < arr_et.length; etcnt++) {
							if(etcnt != 0){
								entryHeader.appendChild(document.createTextNode(" - "));
							}
							if (arr_et[etcnt].match(/(^EP$|^Single$|^Various Artists$)/)) {
								entryHeader.appendChild(document.createTextNode(arr_et[etcnt]));
							}else{
								etAnc = document.createElement("a");
								searchword = Edit_Word(arr_et[etcnt]);
								etAnc.setAttribute("title", ancTitleStr.Top + searchword + ancTitleStr.End);
								etAnc.setAttribute("href", sapiCallStr.Top + edit_point(searchword) + sapiCallStr.End);
								etAnc.appendChild(document.createTextNode(arr_et[etcnt]));
								entryHeader.appendChild(etAnc);
							}
						}
						
						entryContainer.appendChild(entryHeader);
						
					} catch (e) {
						var entryHeader = document.createElement("div");
						entryHeader.className = "entryTitle";
						entryHeader.appendChild(document.createTextNode(entry.title));
						entryContainer.appendChild(entryHeader);
					}
				}/* エントリータイトルの取得 & 表示処理 End */
				
				if (contentValueSelect == Content_Selected.Full) {
					
					//タイトル以外を格納するタグ
					var BaseContent = document.createElement("div");
					BaseContent.className = "basecontent";
					
					//アルバムカバーを格納するタグ
					var coverArtContainer = document.createElement("div");
					coverArtContainer.className = "coverart";
					BaseContent.appendChild(coverArtContainer);
					
					//エントリー情報を格納するタグ
					var entryContent = document.createElement("div");
					entryContent.className = "content";
					var cont_Table = document.createElement("table");
					cont_Table.className = "contTable";
					var cont_Tbody = document.createElement("tbody");
					cont_Tbody.className = "contTbody";
					cont_Table.appendChild(cont_Tbody);
					entryContent.appendChild(cont_Table);
					BaseContent.appendChild(entryContent);
					
					//要素を揃えるタグの生成
					var clearDiv = document.createElement("div");
					clearDiv.className = "clear";
					BaseContent.appendChild(clearDiv);
					
					entryContainer.appendChild(BaseContent);
					
					
					/* 各エントリーの各情報を取得--------------------------------------------------------- */
					
					//カバーアート
					var coverNodes = google.feeds.getElementsByTagNameNS(eNode, ns, "coverArt")[covorArtSize.large];
					if (coverNodes != null) {
						var coverArt = coverNodes.firstChild.nodeValue;
						var albumNodes = google.feeds.getElementsByTagNameNS(eNode, ns, "albumLink")[0];
						var albumLink = albumNodes.firstChild.nodeValue;
						var imgAnc = document.createElement('a');
						imgAnc.setAttribute("href", albumLink);
						var img = document.createElement('img');
						img.src = coverArt;
						imgAnc.appendChild(img);
						coverArtContainer.appendChild(imgAnc);
					}
					
					var ck = Array("album","artist","albumPrice","releasedate","rights");
					var cnd = new Array(ck.length);
					for(ni = 0; ni < cnd.length ;ni++){
						try {cnd[ni] = google.feeds.getElementsByTagNameNS(eNode, ns, ck[ni])[0];} catch (e) {}
					}
					
					//アルバムタイトル
					if (cnd[0] != null) {
						var albumEl = new xElement();
						with (albumEl) {
							CreateChildElementName("Album");
							setAncTextToChildElementContent(cnd[0].firstChild.nodeValue);
							addElement(cont_Tbody);
						}
					}
					
					//アーティスト
					if (cnd[1] != null) {
						var artistEl = new xElement();
						with (artistEl) {
							CreateChildElementName("Artist");
							setAncTextToChildElementContent(cnd[1].firstChild.nodeValue);
							addElement(cont_Tbody);
						}
					}
					
					//プライス
					if (cnd[2] != null) {
						var priceEl = new xElement();
						with (priceEl) {
							CreateChildElementName("Price");
							setTextToChildElementContent(cnd[2].firstChild.nodeValue);
							addElement(cont_Tbody);
						}
					}
					
					//リリース日
					if (cnd[3] != null) {
						var releaseEl = new xElement();
						with (releaseEl) {
							CreateChildElementName("Release");
							setTextToChildElementContent(cnd[3].firstChild.nodeValue);
							addElement(cont_Tbody);
						}
					}
					
					//Copyright
					try {
						if (cnd[4] != null) {
							var crightsEl = new xElement();
							with (crightsEl) {
								setTextToChildElementContent("Copyright " + cnd[4].firstChild.nodeValue);
								ChildElementContent.title = "Copyright " + cnd[4].firstChild.nodeValue;
								ChildElementContent.className = "cprght";
								ChildElementContent.setAttribute("colspan", "2");
								addElement(cont_Tbody);
							}
						}
					}catch (e) {}
				}
			}
			//コンテンツを表示
			container.appendChild(containerDiv);
			
			//以前に表示していたものがあれば削除
			if (container.firstChild.nextSibling) {
				container.removeChild(container.firstChild);
			}
		}
	});
}

function OnLoad(queryWord) {
  var searchControl = new google.search.SearchControl();

  searchControl.addSearcher(new google.search.VideoSearch());
  searchControl.addSearcher(new google.search.ImageSearch());
  searchControl.addSearcher(new google.search.WebSearch());
  searchControl.addSearcher(new google.search.NewsSearch());

  searchControl.draw(document.getElementById("Search"));

  searchControl.execute(queryWord);
}
