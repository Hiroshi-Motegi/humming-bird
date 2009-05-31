{
	version: '1.0',
	encoding: 'UTF-8',
	items: [{
		title: {
			ja: 'フラグ',
			en: 'Flags'
		},
		content: [{
			pt: {
				re: /\d+/,
				$t: '/\\d+/'
			},
			dl: {
				dt: 'フラグなし',
				dd: '対象文字列の中にマッチする文字列が複数存在する場合、最初にマッチした値のみが返ります。\n' +
				'"123abc456" が対象文字列とすると、『\\d+』にマッチするのは "123" と "456" ですが、最初にマッチした"123"のみが返ります。'
			}
		}, {
			pt: {
				re: /\d/g,
				$t: '/\\d/<span class="attention">g</span>'
			},
			dl: {
				dt: '対象文字列の末尾までマッチする文字列を検索する',
				dd: '《 <span class="attention">g</span>lobal match 》\n' +
				'対象文字列の中にマッチする文字列が複数存在する場合、マッチした文字列を配列で返します。'
			}
		}, {
			pt: {
				re: /ab/i,
				$t: '/ab/<span class="attention">i</span>'
			},
			dl: {
				dt: '大/小文字の区別なし',
				dd: '《 <span class="attention">i</span>gnore case 》\n' +
				'大文字、小文字の区別をせずにマッチさせます。\n' +
				'"ab", "Ab", "aB", "AB" にマッチします。'
			}
		}, {
			pt: {
				re: /\d$/m,
				$t: '/\\d$/<span class="attention">m</span>'
			},
			dl: {
				dt: '複数行に渡ってマッチ',
				dd: '《 match over <span class="attention">m</span>ultiple lines (multiline) 》\n' +
				'行末尾にある半角数字にマッチします。\n' +
				'"\\n" によって折り返された複数行となる文字列に対して、"^" や "$" を併せて使用することにより、各行頭または各行末尾にある文字列にマッチさせることができます。'
			}
		}, {
			pt: {
				re: /\w$/gm,
				$t: '/\\w$/<span class="attention">gim</span>'
			},
			dl: {
				dt: 'フラグの組み合わせ',
				dd: '各行末尾にある1つ以上の半角英数字かアンダースコアにマッチします。\n' +
				'フラグの並べ順に制限はありません。\n' +
				'『/\\w$/<span class="attention">mmm</span>』などとしてもエラーにはならず、『/\\w$/<span class="attention">m</span>』と同等の動作となります。'
			}
		}]
	}, {
		title: {
			ja: '位置指定',
			en: 'Anchors'
		},
		content: [{
			pt: {
				re: /^\d/,
				$t: '/<span class="attention">^</span>\\d/'
			},
			dl: {
				dt: '文字列先頭',
				dd: '文字列先頭にある半角数字にマッチします。'
			}
		},{
			pt: {
				re: /\d$/,
				$t: '/\\d<span class="attention">$</span>/'
			},
			dl: {
				dt: '文字列末尾',
				dd: '文字列末尾にある半角数字にマッチします。'
			}
		}, {
			pt: {
				re: /\b\d/,
				$t: '/<span class="attention">\\b</span>\\d/'
			},
			dl: {
				dt: '単語境界',
				dd: '単語境界にある半角数字にマッチします。\n' +
				'<ul><li>対象文字列:"12 34"</li><li>パターン:『/\\b\\d+/g』</li></ul>' +
				'この場合、"12"と"34"が返ります。\n' +
				'しかし『/\\b<span class="attention">.+</span>/g』とすると、"12 34"が返ります。\n' +
				'つまりマッチさせる対象によって単語境界も変わってきますので安易に「空白が区切り」などと判断してはいけません。\n' +
				'単語を構成する文字 =『\w』に相当する文字、<b>ではない</b>ことに注意してください。'
			}
		}, {
			pt: {
				re: /\B\d/,
				$t: '/<span class="attention">\\B</span>\\d/'
			},
			dl: {
				dt: '単語境界以外',
				dd: '単語境界以外にある半角数字にマッチします。'
			}
		}]
	}, {
		title: {
			ja: '量指定',
			en: 'Quantifiers'
		},
		content: [{
			pt: {
				re: /\d+/,
				$t: '/\\d<span class="attention">+</span>/'
			},
			dl: {
				dt: '直前の文字が1つ以上続いた文字列',
				dd: '"1", "02", "1234" など、１つ以上の半角数字にマッチします。'
			}
		}, {
			pt: {
				re: /\(-_-\)z*/,
				$t: '/\\(-_-\\)z<span class="attention">*</span>/'
			},
			dl: {
				dt: '直前の文字が0個以上続いた文字列',
				dd: '"(-_-)", "(-_-)zzz..." にマッチします。'
			}
		}, {
			pt: {
				re: /Nov(ember)?/,
				$t: '/Nov(ember)<span class="attention">?</span>/'
			},
			dl: {
				dt: '直前の文字が0個、または1個',
				dd: '"Nov" または "November" にマッチします。\n' +
				'"()" で囲まれた文字をグループ化し、そのグループ化された文字(列)が一つあるか、または無くともマッチします。'
			}
		}, {
			pt: {
				re: /\d{2}/,
				$t: '/\\d<span class="attention">{</span>2<span class="attention">}</span>/'
			},
			dl: {
				dt: '直前の文字がn個続いた文字',
				dd: '2個続いた半角数字にマッチします。'
			}
		}, {
			pt: {
				re: /\d{2,}/,
				$t: '/\\d<span class="attention">{</span>2<span class="attention">,}</span>/'
			},
			dl: {
				dt: '直前の文字がn個以上続いた文字列',
				dd: '2個以上続いた半角数字にマッチします。\n' +
				'『/a{2,}/』は『/aa+/』に等しい。'
			}
		}, {
			pt: {
				re: /\d{2,4}/,
				$t: '/\\d<span class="attention">{</span>2<span class="attention">,</span>4<span class="attention">}</span>/'
			},
			dl: {
				dt: '直前の文字がn個～n個続いた文字列',
				dd: '2個～4個続いた半角数字にマッチします。'
			}
		}]
	}, {
		title: {
			ja: '選択',
			en: 'Selectors'
		},
		content: [{
			pt: {
				re: /[abc]/,
				$t: '/<span class="attention">[</span>abc<span class="attention">]</span>/'
			},
			dl: {
				dt: '[]内のいずれかの文字',
				dd: '"a"または"b"または"c"にマッチします。\n' +
				'『/[a-c]/』に等しいです。'
			}
		}, {
			pt: {
				re: /[^0-9]+/,
				$t: '/<span class="attention">[^</span>0-9<span class="attention">]</span>+/'
			},
			dl: {
				dt: '"[]" 内の文字以外の文字',
				dd: '0~9 以外の半角数字にマッチします。'
			}
		}, {
			pt: {
				re: /a[^b]c/,
				$t: '/a<span class="attention">[</span>^b<span class="attention">]</span>c/'
			},
			dl: {
				dt: '"[]" 内の文字以外の文字 - その２',
				dd: '"a" と "c" の間に "b" 以外の文字がある文字列にマッチします。\n' +
				'"b" 以外の文字は存在しなければならないので "ac" にはマッチしません。'
			}
		}, {
			pt: {
				re: /(abc)+/,
				$t: '/<span class="attention">(</span>abc<span class="attention">)</span>+/'
			},
			dl: {
				dt: '『abc』の連続',
				dd: '"()" で囲んだ文字列をグループ化します。\n' +
				'"abc", "abcabc..." にマッチします。'
			}
		}, {
			pt: {
				re: /Zaku|Dom/,
				$t: '/Zaku<span class="attention">|</span>Dom/'
			},
			dl: {
				dt: '『a|b』 - "a" または "b"',
				dd: '"Zaku" または "Dom" にマッチします。'
			}
		}, {
			pt: {
				re: /(child|children)/,
				$t: '/<span class="attention">(</span>child|children<span class="attention">)</span>/'
			},
			dl: {
				dt: '『(a|b)』 - "a" または "b"',
				dd: '"child" または "children"にマッチしますが、"children" が対象文字列の場合でも、"child" の部分のみがマッチします。\n' +
				'これ対処するには『/(children|child)/』とします。\n' +
				'『/(children|child)/』は『/child(?:ren)?/』に等しい。'
			}
		}]
	}, {
		title: {
			ja: '文字クラス',
			en: 'Character Classes'
		},
		content: [{
			pt: {
				re: /.+/,
				$t: '/<span class="attention">.</span>+/'
			},
			dl: {
				dt: '改行(\\n)以外の文字',
				dd: '改行以外の文字列にマッチします。\n' +
				'『/[.]+/』のように、"[]" 内に入れるとリテラル文字 "." 扱いになり、"..."などにマッチします。'
			}
		}, {
			pt: {
				re: /\d/,
				$t: '/<span class="attention">\\d</span>/'
			},
			dl: {
				dt: '半角数字',
				dd: 'つまり符号無視、小数点を含む数値の場合、小数点より以前の数字がマッチすることになります。\n' +
				'『/[0-9]/』に等しい。全角数字は対象外となります。'
			}
		}, {
			pt: {
				re: /\D/,
				$t: '/<span class="attention">\\D</span>/'
			},
			dl: {
				dt: '半角数字以外',
				dd: '『/[^0-9]/』に等しい。'
			}
		}, {
			pt: {
				re: /\w/,
				$t: '/<span class="attention">\\w</span>/'
			},
			dl: {
				dt: '1つ以上の英数字かアンダースコア',
				dd: '『/[a-zA-Z0-9_]/』に等しい。'
			}
		}, {
			pt: {
				re: /\W/,
				$t: '/<span class="attention">\\W</span>/'
			},
			dl: {
				dt: '半角英数字とアンダースコア以外',
				dd: '『/[^a-zA-Z0-9_]/』に等しい。'
			}
		}, {
			pt: {
				re: /\s/,
				$t: '/<span class="attention">\\s</span>/'
			},
			dl: {
				dt: '空白文字類',
				dd: '『 ,　,\\t,\\n,\\r,\\f,\\v』の他、ユニコードで空白とされる文字を含めた文字と同等。\n' +
				'全角空白も空白文字類に含まれます。'
			}
		}, {
			pt: {
				re: /\S/,
				$t: '/<span class="attention">\\S</span>/'
			},
			dl: {
				dt: '空白文字類以外',
				dd: ''
			}
		}]
	}, {
		title: {
			ja: '先読み',
			en: 'Assertions'
		},
		content: [{
			pt: {
				re: /Java(?=script)/,
				$t: '/Java(<span class="attention">?=</span>script)/'
			},
			dl: {
				dt: '肯定的前方先読み',
				dd:  '"Java" の後に "script" が続く "Java"' +
				'単なる "Java" や "script"以外の文字が続く "Java" にはマッチしません。'
			}
		}, {
			pt: {
				re: /Java(?!script)/,
				$t: '/Java(<span class="attention">?!</span>script)/'
			},
			dl: {
				dt: '否定的前方先読み',
				dd: '"Java" の後に "script" が続かない "Java"\n' +
				'単なる "Java" または "script" 以外の文字が続く "Java" にマッチします。'
			}
		}]
	}, {
		title: {
			ja: 'キャプチャ',
			en: 'Capturing Parentheses'
		},
		content: [{
			pt: {
				re: /(\d{1,2}):(\d{1,2})/,
				$t: '/<span class="attention">(</span>\\d{1,2}<span class="attention">)</span>:<span class="attention">(</span>\\d{1,2}<span class="attention">)</span>/'
			},
			dl: {
				dt: 'キャプチャ(capturing parentheses)',
				dd:  '"nn:nn"の形の文字列にマッチします。\n' +
				'対象文字列を"15:30"とした場合、置換文字列を"$1時$2分"とし、\n' +
				'replaceを実行すると、結果は"15時30分"となります。'
			}
		}, {
			pt: {
				re: /a(?:bc)/,
				$t: '/a(<span class="attention">?:</span>bc)/'
			},
			dl: {
				dt: 'キャプチャしない括弧(non-capturing parentheses)',
				dd: 'マッチしても括弧に囲まれた文字はキャプチャされません。\n' +
				'"$1"などによって参照することはできません。' +
				'matchを使用した場合、パターンに"()"を使用すると、キャプチャされた文字列まで返されてしまいます。' +
				'このようなときにマッチした結果のみが欲しい場合に使用すると良いでしょう。'
			}
		}]
	}, {
		title: {
			ja: '文字',
			en: 'Characters'
		},
		content: [{
			pt: {
				re: /[a-z]+/,
				$t: '/[a-z]+/'
			},
			dl: {
				dt: '1つ以上の英小文字列を検索する',
				dd: '大文字なら『/[A-Z]+/』、数字なら『/[0-9]+/』\n' +
				'『/[あ-ん]+/』で平仮名にマッチさせることができますが、評価は行っていないので意図しない結果になるかもしれません。'
			}
		}, {
			pt: {
				re: /\x61/,
				$t: '/\\x61/'
			},
			dl: {
				dt: '2桁の16進数文字コードで検索文字を指定',
				dd: '"a" の文字コードは16進数で "61" なので『/a/』に等しいことになります。'
			}
		}, {
			pt: {
				re: /\u0061/,
				$t: '/\\u0061/'
			},
			dl: {
				dt: '4桁の16進数で表すユニコードで検索文字を指定',
				dd: '"a" はユニコード値では "0061" なので『/a/』に等しいことになります。'
			}
		}]
	}, {
		title: {
			ja: '数値',
			en: 'Numbers'
		},
		content: [{
			pt: {
				re: /[\d０-９]+/,
				$t: '/[\\d０-９]+/'
			},
			dl: {
				dt: '全/半角問わず1つ以上の正の整数',
				dd: '『/[0-9０-９]+/』に等しい。'
			}
		}, {
			pt: {
				re: /[+-]?\d+/,
				$t: '/[+-]?\\d+/'
			},
			dl: {
				dt: '符号付きを認める1つ以上の正または負の整数',
				dd: '符号が無くとも良い。\n' +
				'"123", "+123", "-123"などにマッチします。'
			}
		}, {
			pt: {
				re: /^\d+$/,
				$t: '/^\\d+$/'
			},
			dl: {
				dt: '全て半角数字',
				dd: '対象文字列がすべて半角数字の場合にマッチします。'
			}
		}, {
			pt: {
				re: /\d+\.\d+/,
				$t: '/\\d+\\.\\d+/'
			},
			dl: {
				dt: '小数点を含む数値',
				dd: '符号付き小数点付き数値なら『/-?\d+\.\d+/』または『/[+-]?\d+\.\d+/』\n' +
				'全角数字は対象外。'
			}
		}, {
			pt: {
				re: /\d+(\.\d+)?/,
				$t: '/\\d+(\\.\\d+)?/'
			},
			dl: {
				dt: '小数点が含まれることを許す数値',
				dd: '整数と小数点付き数値にもマッチします。\n' +
				'全角数字は対象外。'
			}
		}, {
			pt: {
				re: /[\da-fA-F]+/,
				$t: '/[\\da-fA-F]+/'
			},
			dl: {
				dt: '16進数として評価可能な文字列',
				dd: ''
			}
		}, {
			pt: {
				re: /^0*([\da-f]{1,2}|[\dA-F]{1,2})$/,
				$t: '/^0*([\\da-f]{1,2}|[\\dA-F]{1,2})$/'
			},
			dl: {
				dt: '0~ff(0~255)として評価可能か',
				dd: '桁数は問わない。つまり"00ff"、"ff"ともにマッチします。\n' +
				'"fF" などの大/小文字の混在は許さない。'
			}
		}]
	}, {
		title: {
			ja: 'トリム',
			en: 'Trimming Spaces'
		},
		content: [{
			pt: {
				re: /^\s+/,
				$t: '/^\\s+/'
			},
			dl: {
				dt: 'LTrim',
				dd: '文字列先頭の1つ以上の空白文字にマッチします。\n' +
				'各行ごとにある先頭の空白文字を対象にするなら『/^\\s+/<span class="attention">gm</span>』とします。'
			}
		}, {
			pt: {
				re: /\s+$/,
				$t: '/\\s+$/'
			},
			dl: {
				dt: 'RTrim',
				dd: '文字列末尾の1つ以上の空白文字にマッチします。'
			}
		}, {
			pt: {
				re: /(^\s+|\s+$)/g,
				$t: '/(^\\s+|\\s+$)/g'
			},
			dl: {
				dt: 'Trim',
				dd: '文字列先頭、または末尾の1つ以上の空白文字にマッチします。'
			}
		}, {
			pt: {
				re: /^[ 　\t]+|[ 　\t]+$/gm,
				$t: '/^[ 　\\t]+|[ 　\\t]+$/gm'
			},
			dl: {
				dt: 'Trim Ver.2',
				dd: '行頭/行末尾の1つ以上の全/半空白またはタブ文字にマッチします。'
			}
		}]
	}, {
		title: {
			ja: 'ユーザー情報',
			en: 'User Info'
		},
		content: [{
			pt: {
				re: /^\d{3}-?\d{4}$|^\d{3}-?\d{2}$|^\d{3}$/,
				$t: '/^\\d{3}-?\\d{4}$|^\\d{3}-?\\d{2}$|^\\d{3}$/'
			},
			dl: {
				dt: '郵便番号',
				dd: '"nnn-nnnn", "nnn-nn", "nnn" にマッチします。\n' +
				'以前の形の郵便番号も許す。\n' +
				'5桁、または7桁の場合、"-" はあっても無くても良い。'
			}
		}, {
			pt: {
				re: /^\d{3}-?\d{4}-?\d{4}$/,
				$t: '/^\\d{3}-?\\d{4}-?\\d{4}$/'
			},
			dl: {
				dt: '携帯電話番号',
				dd: '"nnn-nnnn-nnnn" にマッチします。\n' +
				'"-" はあってもなくても良い。\n' +
				'"-" を必須とするなら、"-" のすぐ後ろの "?" を削除します。'
			}
		}, {
			pt: {
				re: /^https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:@&=+$,%#]+$/,
				$t: '/^https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:@&amp;=+$,%#]+$/'
			},
			dl: {
				dt: 'URL',
				dd: 'ftp は対象外'
			}
		}, {
			pt: {
				re: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
				$t: '/^([\\w-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([\\w-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$/'
			},
			dl: {
				dt: 'メールアドレス',
				dd: '参考:<a href="http://msdn.microsoft.com/ja-jp/library/01escwtf.aspx">文字列が有効な電子メール形式であるかどうかを検証する</a>\n' +
				'「メモ :『/』について」も参照して下さい。'
			}
		}, {
			pt: {
				re: /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/,
				$t: '/^(\\d{4})(\/|-)(\\d{1,2})(\/|-)(\\d{1,2})$/'
			},
			dl: {
				dt: '日付',
				dd: '"yyyy-mm-dd" や "yyyy/mm/dd" にマッチします。\n' +
				'厳密には『半角数字4桁(/|-)半角数字1桁以上２桁以内(/|-)半角数字1桁以上２桁以内』になります。'
			}
		},{
			pt: {
				re: /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
				$t: '/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/'
			},
			dl: {
				dt: '時刻',
				dd: '"hh:mm" または "h:mm" にマッチします。'
			}
		}]
	}, {
		title: {
			ja: 'その他',
			en: 'etc'
		},
		content: [{
			pt: {
				re: /<\/?[^>]+>/g,
				$t: '/&lt;\/?[^&gt;]+&gt;/g'
			},
			dl: {
				dt: 'HTML タグ',
				dd: '"&lt;div&gt;" や "&lt;\/span&gt;" などにマッチします。'
			}
		}, {
			pt: {
				re: /#[A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?/,
				$t: '/#[A-Fa-f0-9]{3}([A-Fa-f0-9]{3})?/'
			},
			dl: {
				dt: '16進数 カラーコード',
				dd: '"#FFFFFF" や "#ccc" などにマッチします。'
			}
		}, {
			pt: {
				re: /\s+[^\s]+\s+/g,
				$t: '/\\s+[^\\s]+\\s+/g'
			},
			dl: {
				dt: '空白で囲まれた文字列にマッチさせる',
				dd: '"a b c d"のように空白で区切られた文字列を対象としたとき、マッチするのは"b"と"c"、と思われるかもしれませんが、"b"しかマッチしません。\n' +
				'"\\s" は改行(\\n)もマッチしてしまうので単に"　 "(全/半角空白)とした方が確実かもしれません。'
			}
		}, {
			pt: {
				re: /^ ?\d+\s?(\.|:)? /gm,
				$t: '/^ ?\\d+\\s?(\\.|:)? /gm'
			},
			dl: {
				dt: '各行頭にある不要な文字列を削除する',
				dd: '対象文字列:各行頭にある以下のような文字列\n' +
				'<ul>' +
				'<li>"123 "</li>' +
				'<li>"123: "</li>' +
				'<li>"123. "</li>' +
				'<li>"123 : "</li>' +
				'<li>"123 . "</li>' +
				'</ul>' +
				'このような文字列を replace で削除することができます。'
			}
		}, {
			pt: {
				re: /\n/g,
				$t: '/\\n/g'
			},
			dl: {
				dt: '\\n(改行)を検索する',
				dd: '改行が含まれる文字列をHTMLに表示する場合、改行を"&lt;br/&gt;"に変換すると同じように改行されます。' +
				'textarea に表示する場合は "\\n" で改行されます。'
			}
		}, {
			pt: {
				re: /([0-9]+|[０-９]+)/g,
				$t: '/([0-9]+|[０-９]+)/g'
			},
			dl: {
				dt: '半角数字または全角数字を末尾まで検索する',
				dd: '半角数字の文字列と全角数字の文字列を別の文字列としてマッチさせる。\n' +
				'全/半角問わず有効とするが混在はさせない。\n' +
				'"123４５６"(４５６は全角)を対象とした場合、"123"と"４５６"がマッチする。'
			}
		}]
	}, {
		title: {
			ja: 'メモ',
			en: 'Note'
		},
		content: [{
			pt: {
				re: '',
				$t: '『/』について'
			},
			dl: {
				dt: '',
				dd: '『/』は特殊記号に含まれません。しかし、正規表現リテラルの中では『/』もエスケープが必要となります。'
			}
		}, {
			pt: {
				re: '',
				$t: '『\\』について'
			},
			dl: {
				dt: '',
				dd: '"." をエスケープするには "\\." のように特殊記号の前では特殊記号の本来の作用をエスケープする働きをしますが、特殊記号の前以外に置かれた場合は無視されます。'
			}
		}, {
			pt: {
				re: '',
				$t: '空白文字類について'
			},
			dl: {
				dt: '空白文字に含まれる文字一覧',
				dd: '<ul>' +
				'<li>全/半角空白</li>' +
				'<li>\\f - 改ページ(form-feed)</li>' +
				'<li>\\r - 行頭復帰(carriage return)</li>' +
				'<li>\\n - 改行(linefeed)</li>' +
				'<li>\\t - タブ(tab)</li>' +
				'<li>\\v - 垂直タブ(a vertical tab)</li>' +
				'</ul>'
			}
		}]
	}]
}