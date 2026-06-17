// 五十音資料庫
// kanjiHira / kanjiKata: 該假名草書化／取自的漢字來源 (萬葉假名)
// example: 該平假名的範例詞彙 (word 為平假名拼寫，romaji 羅馬拼音，zh 中文意思)，輔助記憶用
export const gojuonData = [
    { row: 'a', label: 'あ行', chars: [
        { hira: 'あ', kata: 'ア', romaji: 'a', dan: 'a', kanjiHira: '安', kanjiKata: '阿', example: { word: 'あさ', romaji: 'asa', zh: '早上' } },
        { hira: 'い', kata: 'イ', romaji: 'i', dan: 'i', kanjiHira: '以', kanjiKata: '伊', example: { word: 'いぬ', romaji: 'inu', zh: '狗' } },
        { hira: 'う', kata: 'ウ', romaji: 'u', dan: 'u', kanjiHira: '宇', kanjiKata: '宇', example: { word: 'うみ', romaji: 'umi', zh: '海' } },
        { hira: 'え', kata: 'エ', romaji: 'e', dan: 'e', kanjiHira: '衣', kanjiKata: '江', example: { word: 'えき', romaji: 'eki', zh: '車站' } },
        { hira: 'お', kata: 'オ', romaji: 'o', dan: 'o', kanjiHira: '於', kanjiKata: '於', example: { word: 'おかし', romaji: 'okashi', zh: '點心' } }
    ]},
    { row: 'k', label: 'か行', chars: [
        { hira: 'か', kata: 'カ', romaji: 'ka', dan: 'a', kanjiHira: '加', kanjiKata: '加', example: { word: 'かさ', romaji: 'kasa', zh: '雨傘' } },
        { hira: 'き', kata: 'キ', romaji: 'ki', dan: 'i', kanjiHira: '幾', kanjiKata: '幾', example: { word: 'きって', romaji: 'kitte', zh: '郵票' } },
        { hira: 'く', kata: 'ク', romaji: 'ku', dan: 'u', kanjiHira: '久', kanjiKata: '久', example: { word: 'くるま', romaji: 'kuruma', zh: '車子' } },
        { hira: 'け', kata: 'ケ', romaji: 'ke', dan: 'e', kanjiHira: '計', kanjiKata: '介', example: { word: 'けしごむ', romaji: 'keshigomu', zh: '橡皮擦' } },
        { hira: 'こ', kata: 'コ', romaji: 'ko', dan: 'o', kanjiHira: '己', kanjiKata: '己', example: { word: 'こども', romaji: 'kodomo', zh: '小孩' } }
    ]},
    { row: 's', label: 'さ行', chars: [
        { hira: 'さ', kata: 'サ', romaji: 'sa', dan: 'a', kanjiHira: '左', kanjiKata: '散', example: { word: 'さかな', romaji: 'sakana', zh: '魚' } },
        { hira: 'し', kata: 'シ', romaji: 'shi', dan: 'i', kanjiHira: '之', kanjiKata: '之', example: { word: 'しんぶん', romaji: 'shinbun', zh: '報紙' } },
        { hira: 'す', kata: 'ス', romaji: 'su', dan: 'u', kanjiHira: '寸', kanjiKata: '須', example: { word: 'すいか', romaji: 'suika', zh: '西瓜' } },
        { hira: 'せ', kata: 'セ', romaji: 'se', dan: 'e', kanjiHira: '世', kanjiKata: '世', example: { word: 'せんせい', romaji: 'sensei', zh: '老師' } },
        { hira: 'そ', kata: 'ソ', romaji: 'so', dan: 'o', kanjiHira: '曽', kanjiKata: '曽', example: { word: 'そら', romaji: 'sora', zh: '天空' } }
    ]},
    { row: 't', label: 'た行', chars: [
        { hira: 'た', kata: 'タ', romaji: 'ta', dan: 'a', kanjiHira: '太', kanjiKata: '多', example: { word: 'たまご', romaji: 'tamago', zh: '雞蛋' } },
        { hira: 'ち', kata: 'チ', romaji: 'chi', dan: 'i', kanjiHira: '知', kanjiKata: '千', example: { word: 'ちず', romaji: 'chizu', zh: '地圖' } },
        { hira: 'つ', kata: 'ツ', romaji: 'tsu', dan: 'u', kanjiHira: '川', kanjiKata: '川', example: { word: 'つくえ', romaji: 'tsukue', zh: '書桌' } },
        { hira: 'て', kata: 'テ', romaji: 'te', dan: 'e', kanjiHira: '天', kanjiKata: '天', example: { word: 'てがみ', romaji: 'tegami', zh: '信' } },
        { hira: 'と', kata: 'ト', romaji: 'to', dan: 'o', kanjiHira: '止', kanjiKata: '止', example: { word: 'とけい', romaji: 'tokei', zh: '時鐘' } }
    ]},
    { row: 'n', label: 'な行', chars: [
        { hira: 'な', kata: 'ナ', romaji: 'na', dan: 'a', kanjiHira: '奈', kanjiKata: '奈', example: { word: 'なつ', romaji: 'natsu', zh: '夏天' } },
        { hira: 'に', kata: 'ニ', romaji: 'ni', dan: 'i', kanjiHira: '仁', kanjiKata: '仁', example: { word: 'にく', romaji: 'niku', zh: '肉' } },
        { hira: 'ぬ', kata: 'ヌ', romaji: 'nu', dan: 'u', kanjiHira: '奴', kanjiKata: '奴', example: { word: 'ぬの', romaji: 'nuno', zh: '布' } },
        { hira: 'ね', kata: 'ネ', romaji: 'ne', dan: 'e', kanjiHira: '祢', kanjiKata: '祢', example: { word: 'ねこ', romaji: 'neko', zh: '貓' } },
        { hira: 'の', kata: 'ノ', romaji: 'no', dan: 'o', kanjiHira: '乃', kanjiKata: '乃', example: { word: 'のみもの', romaji: 'nomimono', zh: '飲料' } }
    ]},
    { row: 'h', label: 'は行', chars: [
        { hira: 'は', kata: 'ハ', romaji: 'ha', dan: 'a', kanjiHira: '波', kanjiKata: '八', example: { word: 'はな', romaji: 'hana', zh: '花' } },
        { hira: 'ひ', kata: 'ヒ', romaji: 'hi', dan: 'i', kanjiHira: '比', kanjiKata: '比', example: { word: 'ひこうき', romaji: 'hikouki', zh: '飛機' } },
        { hira: 'ふ', kata: 'フ', romaji: 'fu', dan: 'u', kanjiHira: '不', kanjiKata: '不', example: { word: 'ふね', romaji: 'fune', zh: '船' } },
        { hira: 'へ', kata: 'ヘ', romaji: 'he', dan: 'e', kanjiHira: '部', kanjiKata: '部', example: { word: 'へや', romaji: 'heya', zh: '房間' } },
        { hira: 'ほ', kata: 'ホ', romaji: 'ho', dan: 'o', kanjiHira: '保', kanjiKata: '保', example: { word: 'ほん', romaji: 'hon', zh: '書' } }
    ]},
    { row: 'm', label: 'ま行', chars: [
        { hira: 'ま', kata: 'マ', romaji: 'ma', dan: 'a', kanjiHira: '末', kanjiKata: '末', example: { word: 'まど', romaji: 'mado', zh: '窗戶' } },
        { hira: 'み', kata: 'ミ', romaji: 'mi', dan: 'i', kanjiHira: '美', kanjiKata: '三', example: { word: 'みず', romaji: 'mizu', zh: '水' } },
        { hira: 'む', kata: 'ム', romaji: 'mu', dan: 'u', kanjiHira: '武', kanjiKata: '牟', example: { word: 'むし', romaji: 'mushi', zh: '蟲' } },
        { hira: 'め', kata: 'メ', romaji: 'me', dan: 'e', kanjiHira: '女', kanjiKata: '女', example: { word: 'めがね', romaji: 'megane', zh: '眼鏡' } },
        { hira: 'も', kata: 'モ', romaji: 'mo', dan: 'o', kanjiHira: '毛', kanjiKata: '毛', example: { word: 'もり', romaji: 'mori', zh: '森林' } }
    ]},
    { row: 'y', label: 'や行', chars: [
        { hira: 'や', kata: 'ヤ', romaji: 'ya', dan: 'a', kanjiHira: '也', kanjiKata: '也', example: { word: 'やま', romaji: 'yama', zh: '山' } },
        { hira: '', kata: '', romaji: '', dan: 'i' },
        { hira: 'ゆ', kata: 'ユ', romaji: 'yu', dan: 'u', kanjiHira: '由', kanjiKata: '由', example: { word: 'ゆき', romaji: 'yuki', zh: '雪' } },
        { hira: '', kata: '', romaji: '', dan: 'e' },
        { hira: 'よ', kata: 'ヨ', romaji: 'yo', dan: 'o', kanjiHira: '与', kanjiKata: '与', example: { word: 'よる', romaji: 'yoru', zh: '夜晚' } }
    ]},
    { row: 'r', label: 'ら行', chars: [
        { hira: 'ら', kata: 'ラ', romaji: 'ra', dan: 'a', kanjiHira: '良', kanjiKata: '良', example: { word: 'らいねん', romaji: 'rainen', zh: '明年' } },
        { hira: 'り', kata: 'リ', romaji: 'ri', dan: 'i', kanjiHira: '利', kanjiKata: '利', example: { word: 'りんご', romaji: 'ringo', zh: '蘋果' } },
        { hira: 'る', kata: 'ル', romaji: 'ru', dan: 'u', kanjiHira: '留', kanjiKata: '流', example: { word: 'るす', romaji: 'rusu', zh: '不在家' } },
        { hira: 'れ', kata: 'レ', romaji: 're', dan: 'e', kanjiHira: '礼', kanjiKata: '礼', example: { word: 'れいぞうこ', romaji: 'reizouko', zh: '冰箱' } },
        { hira: 'ろ', kata: 'ロ', romaji: 'ro', dan: 'o', kanjiHira: '呂', kanjiKata: '呂', example: { word: 'ろうか', romaji: 'rouka', zh: '走廊' } }
    ]},
    { row: 'w', label: 'わ行', chars: [
        { hira: 'わ', kata: 'ワ', romaji: 'wa', dan: 'a', kanjiHira: '和', kanjiKata: '和', example: { word: 'わたし', romaji: 'watashi', zh: '我' } },
        { hira: '', kata: '', romaji: '', dan: 'i' },
        { hira: '', kata: '', romaji: '', dan: 'u' },
        { hira: '', kata: '', romaji: '', dan: 'e' },
        { hira: 'を', kata: 'ヲ', romaji: 'wo', dan: 'o', kanjiHira: '遠', kanjiKata: '乎', example: { word: 'ほんをよむ', romaji: 'hon o yomu', zh: '讀書 (を 的用法)' } }
    ]},
    { row: 'n_special', label: '撥音', chars: [
        { hira: 'ん', kata: 'ン', romaji: 'n', dan: 'special', kanjiHira: '无', kanjiKata: '尓', example: { word: 'みかん', romaji: 'mikan', zh: '橘子 (ん 的用法)' } }
    ]}
];

// 段的定義 (用於渲染表格)
export const dans = ['a', 'i', 'u', 'e', 'o'];
export const danLabels = ['あ段 (a)', 'い段 (i)', 'う段 (u)', 'え段 (e)', 'お段 (o)'];
