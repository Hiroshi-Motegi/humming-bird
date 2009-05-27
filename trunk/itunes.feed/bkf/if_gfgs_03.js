google.load("feeds", "1");
google.load("search", "1");

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

function initialize(fCategory,fGenre){
	
	//カテゴリーとジャンルの値を保持するためにタグに書き出す
	Set_CandG_Val(fCategory,fGenre);
	
	//ドロップダウンリストからエントリー取得数を取得する
	var entryLimit = List_GetSelectedValue("EntryCountList");
	//ドロップダウンリストから国を取得する
	var countryNum = List_GetSelectedValue("CountryList");
	
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
			
			//各フィードを格納
			var containerDiv = document.createElement("div");
			containerDiv.className = "feedcontainer";
			
			//フィードタイトルを取得
			var feedDescription = result.feed.description; 
			feedDescription = feedDescription.replace(/iTunes Store ?:/,"");
			
			//フィードタイトルを格納
			var FeedTitle = document.createElement("h3");
			FeedTitle.className = "feedtitle";
			FeedTitle.innerHTML = feedDescription;
			containerDiv.appendChild(FeedTitle);

			for (var i = 0; i < result.feed.entries.length; i++) {
			
				var entry = result.feed.entries[i];
				var ns = "http://phobos.apple.com/rss/1.0/modules/itms/";
				var eNode = entry.xmlNode;
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
				
				//エントリーを格納するタグ
				var entryContainer = document.createElement("div");
				entryContainer.className = "entryCont";
				containerDiv.appendChild(entryContainer);
				
				if (entry.title != null) {
					try {
						var entryHeader = document.createElement("div");
						entryHeader.className = "entryTitle";
						
						var str = new String;
						str = entry.title;
						
						var rankNum;
						re = RegExp(/^[0-9]+\.\s/);
						if (str.match(re)){
							//rankNum = RegExp.lastMatch ;
							rankNum = str.substring(0,str.indexOf(" ")) ;
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
				}
				
				if (List_GetSelectedValue("EntryVisiblityList") == Content_Selected.Full) {
					
					//タイトル以外を格納するタグ
					var BaseContent = document.createElement("div");
					BaseContent.className = "basecontent";
					entryContainer.appendChild(BaseContent);
					
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
					
					//要素を揃える
					var clearDiv = document.createElement("div");
					clearDiv.className = "clear";
					BaseContent.appendChild(clearDiv);
					
					
					//各エントリーの各情報を取得---------------------------------------------------------
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
					
					//アルバムタイトル
					var albumtitleNodes = google.feeds.getElementsByTagNameNS(eNode, ns, "album")[0];
					if (albumtitleNodes != null) {
						var albumTitle_tr = document.createElement("tr");
						var name_album_td = document.createElement("td");
						name_album_td.className = "name_td";
						name_album_td.appendChild(document.createTextNode("Album :"));
						albumTitle_tr.appendChild(name_album_td);
						
						
						var albumTitle = albumtitleNodes.firstChild.nodeValue;
						var albumtitle_td = document.createElement("td");
						var albumAnc = document.createElement('a');
						albumAnc.appendChild(document.createTextNode(albumTitle));
						
						albumTitle = Edit_Word(albumTitle);
						
						albumAnc.setAttribute("title", ancTitleStr.Top + albumTitle + ancTitleStr.End);
						albumAnc.setAttribute("href", sapiCallStr.Top + edit_point(albumTitle) + sapiCallStr.End);
						
						albumtitle_td.appendChild(albumAnc);
						albumTitle_tr.appendChild(albumtitle_td);
						
						cont_Tbody.appendChild(albumTitle_tr);
					}
					
					
					//アーティスト
					var artistNodes = google.feeds.getElementsByTagNameNS(eNode, ns, "artist")[0];
					if (artistNodes != null) {
						var artist_tr = document.createElement("tr");
						var name_artist_td = document.createElement("td");
						name_artist_td.className = "name_td";
						name_artist_td.appendChild(document.createTextNode("Artist :"));
						artist_tr.appendChild(name_artist_td);
						
						var artist = artistNodes.firstChild.nodeValue;
						
						var artist_td = document.createElement("td");
						var artistAnc = document.createElement('a');
						artistAnc.appendChild(document.createTextNode(artist));
						
						artist = Edit_Word(artist);
						
						artistAnc.setAttribute("title", ancTitleStr.Top + artist + ancTitleStr.End);
						artistAnc.setAttribute("href", sapiCallStr.Top + edit_point(artist) + sapiCallStr.End);
						
						artist_td.appendChild(artistAnc);
						artist_tr.appendChild(artist_td);
						
						cont_Tbody.appendChild(artist_tr);
					}
					
					//プライス
					var priceNodes = google.feeds.getElementsByTagNameNS(eNode, ns, "albumPrice")[0];
					if (priceNodes != null) {
						var price_tr = document.createElement("tr");
						var name_price_td = document.createElement("td");
						name_price_td.className = "name_td";
						name_price_td.appendChild(document.createTextNode("Price :"));
						price_tr.appendChild(name_price_td);
						
						var price = priceNodes.firstChild.nodeValue;
						var price_td = document.createElement("td");
						price_td.appendChild(document.createTextNode(price));
						price_tr.appendChild(price_td);
						
						cont_Tbody.appendChild(price_tr);
					}
					
					//リリース日
					var releaseNodes = google.feeds.getElementsByTagNameNS(eNode, ns, "releasedate")[0];
					if (releaseNodes != null) {
						var release_tr = document.createElement("tr");
						var name_release_td = document.createElement("td");
						name_release_td.className = "name_td";
						name_release_td.appendChild(document.createTextNode("Release :"));
						release_tr.appendChild(name_release_td);
						
						var release = releaseNodes.firstChild.nodeValue;
						var release_td = document.createElement("td");
						release_td.appendChild(document.createTextNode(release));
						release_tr.appendChild(release_td);
						
						cont_Tbody.appendChild(release_tr);
					}
					
					//Copyright
					try {
						var rightsNodes = google.feeds.getElementsByTagNameNS(eNode, ns, "rights")[0];
						if (rightsNodes != null) {
							var rights = rightsNodes.firstChild.nodeValue;
							var rightsP = document.createElement("p");
							rightsP.className = "cprght";
							rightsP.title = "Copyright " + rights;
							rightsP.appendChild(document.createTextNode("Copyright " + rights));
							entryContent.appendChild(rightsP);
						}
					}catch (e) {}
				}
			}
			//コンテンツを表示
			container.appendChild(containerDiv);
			
			//以前に表示していたものがあれば削除
			var tgtParent=document.getElementById("feed");
			var tgt_firstchild=tgtParent.firstChild;
			if (tgt_firstchild.nextSibling) {
				tgtParent.removeChild(tgtParent.firstChild);
			}
		}
	});
}

google.setOnLoadCallback(initialize());

//---------------------------------------------------------*
function OnLoad(queryWord) {
  var searchControl = new google.search.SearchControl();

  searchControl.addSearcher(new google.search.VideoSearch());
  searchControl.addSearcher(new google.search.WebSearch());
  searchControl.addSearcher(new google.search.NewsSearch());
  searchControl.addSearcher(new google.search.ImageSearch());

  searchControl.draw(document.getElementById("SearchResult"));

  searchControl.execute(queryWord);
}

google.setOnLoadCallback(OnLoad(), false);

//---------------------------------------------------------*
function Edit_Word(tgtStr){
	tgtStr = tgtStr.replace(/\s?-\s(EP|Single)/, "");
	tgtStr = tgtStr.replace(/(\(|\[|~|～).*(\)|\]|~|～)/g, "");
	tgtStr = tgtStr.replace(/\s~.*$/, "");
	tgtStr = tgtStr.replace(/~[^0-9]*$/, "");
	tgtStr = tgtStr.replace(/^\s+|\s+$/g, "");
	return tgtStr;
}
function edit_point(tgtStr){
	tgtStr = tgtStr.replace(/"/g, "\\\"");
	tgtStr = tgtStr.replace(/'/g, "\\\'");
	return tgtStr;
}
//---------------------------------------------------------
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
//---------------------------------------------------------

function List_GetSelectedValue(id){
	try{
			element = document.getElementById(id);
			return element.options[element.selectedIndex].value;
		}catch (e) {}
}
//---------------------------------------------------------

function Set_CandG_Val(cVal,gVal){
	document.getElementById("categoryVal").value = cVal;
	document.getElementById("genreVal").value = gVal;
}
//---------------------------------------------------------

function List_SelectedValue_Changed(){
	cVal = document.getElementById("categoryVal").value;
	gVal = document.getElementById("genreVal").value;
	initialize(cVal,gVal);
}
//---------------------------------------------------------