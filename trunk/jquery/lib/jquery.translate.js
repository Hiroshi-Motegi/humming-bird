/**
 * jQuery plugin gTranslate
 * Copyright 2010
 * Released under the MIT and GPL licenses.
 * 
 * Author     : y@s
 * Version    : 1.0
 * Published  : 2010-03-14
 * LastUpdate : 2010-03-19
 * Reference  : http://code.google.com/intl/ja/apis/ajaxlanguage/documentation/reference.html
 * Demo       : http://code.google.com/p/humming-bird/source/browse/trunk/jquery/demo/translate.demo.html
 */

(function($){
/**
 * @param {Object}   params
 *          - {string} q        : Query term
 *          - {string} v        : Google API Version
 *          - {string} hl       : Host Language 
 *          - {string} key      : API Key
 *          - {string} context  : Related to the context argument
 *          - {string} langpair : language pair to translate
 *          - {string} from     : Original language
 *          - {string} to       : Translated language
 *
 * @param {function} callback - callback function
 */

$.gTranslate = function(params, callback){
	var prm = $.extend({
		v    : "1.0",
		from : "en",
		to   : "ja"
	}, params);
	
	if (!prm.langpair || !(/^[a-z]{2}\|[a-z]{2}$/.test(prm.langpair)) )
		prm.langpair = prm.from + '|' + prm.to;
	
	delete prm.from;
	delete prm.to;
	
	$.get('http://ajax.googleapis.com/ajax/services/language/translate?', prm,
		function(ret){
			callback.call(this, !ret.responseDetails ?
				ret.responseData.translatedText :
				'Error:' + ret.responseDetails);
		}, 'jsonp');
};


/* past
$.gTranslate = function(word, org, to, callback){
	google.language.translate(word, org, org, function(result){
		if (!result.error) {
			callback.call(this, result.translation);
		}
	});	
};
*/


$.gTranslate.Languages = {
  'AFRIKAANS' : 'af',
  'ALBANIAN' : 'sq',
  'AMHARIC' : 'am',
  'ARABIC' : 'ar',
  'ARMENIAN' : 'hy',
  'AZERBAIJANI' : 'az',
  'BASQUE' : 'eu',
  'BELARUSIAN' : 'be',
  'BENGALI' : 'bn',
  'BIHARI' : 'bh',
  'BULGARIAN' : 'bg',
  'BURMESE' : 'my',
  'CATALAN' : 'ca',
  'CHEROKEE' : 'chr',
  'CHINESE' : 'zh',
  'CHINESE_SIMPLIFIED' : 'zh-CN',
  'CHINESE_TRADITIONAL' : 'zh-TW',
  'CROATIAN' : 'hr',
  'CZECH' : 'cs',
  'DANISH' : 'da',
  'DHIVEHI' : 'dv',
  'DUTCH': 'nl',  
  'ENGLISH' : 'en',
  'ESPERANTO' : 'eo',
  'ESTONIAN' : 'et',
  'FILIPINO' : 'tl',
  'FINNISH' : 'fi',
  'FRENCH' : 'fr',
  'GALICIAN' : 'gl',
  'GEORGIAN' : 'ka',
  'GERMAN' : 'de',
  'GREEK' : 'el',
  'GUARANI' : 'gn',
  'GUJARATI' : 'gu',
  'HEBREW' : 'iw',
  'HINDI' : 'hi',
  'HUNGARIAN' : 'hu',
  'ICELANDIC' : 'is',
  'INDONESIAN' : 'id',
  'INUKTITUT' : 'iu',
  'ITALIAN' : 'it',
  'JAPANESE' : 'ja',
  'KANNADA' : 'kn',
  'KAZAKH' : 'kk',
  'KHMER' : 'km',
  'KOREAN' : 'ko',
  'KURDISH': 'ku',
  'KYRGYZ': 'ky',
  'LAOTHIAN': 'lo',
  'LATVIAN' : 'lv',
  'LITHUANIAN' : 'lt',
  'MACEDONIAN' : 'mk',
  'MALAY' : 'ms',
  'MALAYALAM' : 'ml',
  'MALTESE' : 'mt',
  'MARATHI' : 'mr',
  'MONGOLIAN' : 'mn',
  'NEPALI' : 'ne',
  'NORWEGIAN' : 'no',
  'ORIYA' : 'or',
  'PASHTO' : 'ps',
  'PERSIAN' : 'fa',
  'POLISH' : 'pl',
  'PORTUGUESE' : 'pt-PT',
  'PUNJABI' : 'pa',
  'ROMANIAN' : 'ro',
  'RUSSIAN' : 'ru',
  'SANSKRIT' : 'sa',
  'SERBIAN' : 'sr',
  'SINDHI' : 'sd',
  'SINHALESE' : 'si',
  'SLOVAK' : 'sk',
  'SLOVENIAN' : 'sl',
  'SPANISH' : 'es',
  'SWAHILI' : 'sw',
  'SWEDISH' : 'sv',
  'TAJIK' : 'tg',
  'TAMIL' : 'ta',
  'TAGALOG' : 'tl',
  'TELUGU' : 'te',
  'THAI' : 'th',
  'TIBETAN' : 'bo',
  'TURKISH' : 'tr',
  'UKRAINIAN' : 'uk',
  'URDU' : 'ur',
  'UZBEK' : 'uz',
  'UIGHUR' : 'ug',
  'VIETNAMESE' : 'vi',
  'UNKNOWN' : ''
};
})(jQuery);
