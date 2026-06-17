// 常用短句資料庫，依場景分類
// segments: 句子的逐段拆解，reading 不為 null 時代表該段是漢字、需要在上方標注讀音 (furigana)
//           reading 為 null 的段落本身就是假名/外來語，不需要再標注
// tokens: 給「句子排序」測驗用的詞彙切分（依語意斷詞，不是逐字）。只有長度 >= 2 的句子才適合排序練習，
//         單一固定短語 (如「すみません」) 沒有 tokens
export const phraseCategories = [
    {
        id: 'greetings',
        label: '基本問候',
        icon: 'fa-handshake',
        phrases: [
            { jp: 'おはようございます', segments: [{ text: 'おはようございます', reading: null }], romaji: 'ohayou gozaimasu', zh: '早安', tokens: ['おはよう', 'ございます'] },
            { jp: 'こんにちは', segments: [{ text: 'こんにちは', reading: null }], romaji: 'konnichiwa', zh: '午安、你好' },
            { jp: 'こんばんは', segments: [{ text: 'こんばんは', reading: null }], romaji: 'konbanwa', zh: '晚安(見面問候)' },
            { jp: 'ありがとうございます', segments: [{ text: 'ありがとうございます', reading: null }], romaji: 'arigatou gozaimasu', zh: '謝謝', tokens: ['ありがとう', 'ございます'] },
            { jp: 'すみません', segments: [{ text: 'すみません', reading: null }], romaji: 'sumimasen', zh: '不好意思、抱歉' },
            { jp: 'はじめまして', segments: [{ text: 'はじめまして', reading: null }], romaji: 'hajimemashite', zh: '初次見面，你好' },
            { jp: 'よろしくお願いします', segments: [{ text: 'よろしくお', reading: null }, { text: '願', reading: 'ねが' }, { text: 'いします', reading: null }], romaji: 'yoroshiku onegaishimasu', zh: '請多指教', tokens: ['よろしく', 'お願いします'] },
            { jp: 'さようなら', segments: [{ text: 'さようなら', reading: null }], romaji: 'sayounara', zh: '再見' }
        ]
    },
    {
        id: 'travel',
        label: '旅遊實用',
        icon: 'fa-suitcase-rolling',
        phrases: [
            { jp: 'トイレはどこですか', segments: [{ text: 'トイレはどこですか', reading: null }], romaji: 'toire wa doko desu ka', zh: '廁所在哪裡？', tokens: ['トイレは', 'どこ', 'ですか'] },
            { jp: '駅はどこですか', segments: [{ text: '駅', reading: 'えき' }, { text: 'はどこですか', reading: null }], romaji: 'eki wa doko desu ka', zh: '車站在哪裡？', tokens: ['駅は', 'どこ', 'ですか'] },
            { jp: 'これはいくらですか', segments: [{ text: 'これはいくらですか', reading: null }], romaji: 'kore wa ikura desu ka', zh: '這個多少錢？', tokens: ['これは', 'いくら', 'ですか'] },
            { jp: '写真を撮ってもらえますか', segments: [{ text: '写真', reading: 'しゃしん' }, { text: 'を', reading: null }, { text: '撮', reading: 'と' }, { text: 'ってもらえますか', reading: null }], romaji: 'shashin o totte moraemasu ka', zh: '可以幫我拍照嗎？', tokens: ['写真を', '撮って', 'もらえますか'] },
            { jp: 'タクシーを呼んでください', segments: [{ text: 'タクシーを', reading: null }, { text: '呼', reading: 'よ' }, { text: 'んでください', reading: null }], romaji: 'takushii o yonde kudasai', zh: '請幫我叫計程車', tokens: ['タクシーを', '呼んで', 'ください'] },
            { jp: '英語を話せますか', segments: [{ text: '英語', reading: 'えいご' }, { text: 'を', reading: null }, { text: '話', reading: 'はな' }, { text: 'せますか', reading: null }], romaji: 'eigo o hanasemasu ka', zh: '你會說英文嗎？', tokens: ['英語を', '話せます', 'か'] },
            { jp: 'Wi-Fiはありますか', segments: [{ text: 'Wi-Fiはありますか', reading: null }], romaji: 'waifai wa arimasu ka', zh: '有Wi-Fi嗎？', tokens: ['Wi-Fiは', 'あります', 'か'] }
        ]
    },
    {
        id: 'dining',
        label: '點餐用餐',
        icon: 'fa-utensils',
        phrases: [
            { jp: 'メニューを見せてください', segments: [{ text: 'メニューを', reading: null }, { text: '見', reading: 'み' }, { text: 'せてください', reading: null }], romaji: 'menyuu o misete kudasai', zh: '請給我看菜單', tokens: ['メニューを', '見せて', 'ください'] },
            { jp: 'これをお願いします', segments: [{ text: 'これをお', reading: null }, { text: '願', reading: 'ねが' }, { text: 'いします', reading: null }], romaji: 'kore o onegaishimasu', zh: '請給我這個', tokens: ['これを', 'お願い', 'します'] },
            { jp: 'おすすめは何ですか', segments: [{ text: 'おすすめは', reading: null }, { text: '何', reading: 'なん' }, { text: 'ですか', reading: null }], romaji: 'osusume wa nan desu ka', zh: '有什麼推薦的嗎？', tokens: ['おすすめは', '何', 'ですか'] },
            { jp: '辛くしないでください', segments: [{ text: '辛', reading: 'から' }, { text: 'くしないでください', reading: null }], romaji: 'karaku shinaide kudasai', zh: '請不要辣', tokens: ['辛く', 'しないで', 'ください'] },
            { jp: 'お会計をお願いします', segments: [{ text: 'お', reading: null }, { text: '会計', reading: 'かいけい' }, { text: 'をお', reading: null }, { text: '願', reading: 'ねが' }, { text: 'いします', reading: null }], romaji: 'okaikei o onegaishimasu', zh: '請幫我結帳', tokens: ['お会計を', 'お願い', 'します'] },
            { jp: 'いただきます', segments: [{ text: 'いただきます', reading: null }], romaji: 'itadakimasu', zh: '我要開動了' },
            { jp: 'ごちそうさまでした', segments: [{ text: 'ごちそうさまでした', reading: null }], romaji: 'gochisousama deshita', zh: '我吃飽了(謝謝款待)' },
            { jp: 'おいしいです', segments: [{ text: 'おいしいです', reading: null }], romaji: 'oishii desu', zh: '很好吃', tokens: ['おいしい', 'です'] }
        ]
    },
    {
        id: 'shopping',
        label: '購物',
        icon: 'fa-cart-shopping',
        phrases: [
            { jp: 'すみません、これはありますか', segments: [{ text: 'すみません、これはありますか', reading: null }], romaji: 'sumimasen, kore wa arimasu ka', zh: '不好意思，請問有這個嗎？', tokens: ['すみません、', 'これは', 'ありますか'] },
            { jp: '試着してもいいですか', segments: [{ text: '試着', reading: 'しちゃく' }, { text: 'してもいいですか', reading: null }], romaji: 'shichaku shite mo ii desu ka', zh: '可以試穿嗎？', tokens: ['試着', 'しても', 'いいですか'] },
            { jp: '免税できますか', segments: [{ text: '免税', reading: 'めんぜい' }, { text: 'できますか', reading: null }], romaji: 'menzei dekimasu ka', zh: '可以免稅嗎？', tokens: ['免税', 'でき', 'ますか'] },
            { jp: 'カードは使えますか', segments: [{ text: 'カードは', reading: null }, { text: '使', reading: 'つか' }, { text: 'えますか', reading: null }], romaji: 'kaado wa tsukaemasu ka', zh: '可以刷卡嗎？', tokens: ['カードは', '使え', 'ますか'] },
            { jp: 'もう少し安くなりますか', segments: [{ text: 'もう', reading: null }, { text: '少', reading: 'すこ' }, { text: 'し', reading: null }, { text: '安', reading: 'やす' }, { text: 'くなりますか', reading: null }], romaji: 'mou sukoshi yasuku narimasu ka', zh: '可以便宜一點嗎？', tokens: ['もう少し', '安く', 'なりますか'] },
            { jp: '大きいサイズはありますか', segments: [{ text: '大', reading: 'おお' }, { text: 'きいサイズはありますか', reading: null }], romaji: 'ookii saizu wa arimasu ka', zh: '有大尺碼嗎？', tokens: ['大きい', 'サイズは', 'ありますか'] },
            { jp: '袋をいただけますか', segments: [{ text: '袋', reading: 'ふくろ' }, { text: 'をいただけますか', reading: null }], romaji: 'fukuro o itadakemasu ka', zh: '可以給我袋子嗎？', tokens: ['袋を', 'いただけ', 'ますか'] },
            { jp: 'これと同じものはありますか', segments: [{ text: 'これと', reading: null }, { text: '同', reading: 'おな' }, { text: 'じものはありますか', reading: null }], romaji: 'kore to onaji mono wa arimasu ka', zh: '有跟這個一樣的嗎？', tokens: ['これと', '同じものは', 'ありますか'] }
        ]
    },
    {
        id: 'transportation',
        label: '交通',
        icon: 'fa-train',
        phrases: [
            { jp: '次の電車は何時ですか', segments: [{ text: '次', reading: 'つぎ' }, { text: 'の', reading: null }, { text: '電車', reading: 'でんしゃ' }, { text: 'は', reading: null }, { text: '何時', reading: 'なんじ' }, { text: 'ですか', reading: null }], romaji: 'tsugi no densha wa nanji desu ka', zh: '下一班電車是幾點？', tokens: ['次の', '電車は', '何時ですか'] },
            { jp: 'この電車は新宿に行きますか', segments: [{ text: 'この', reading: null }, { text: '電車', reading: 'でんしゃ' }, { text: 'は', reading: null }, { text: '新宿', reading: 'しんじゅく' }, { text: 'に', reading: null }, { text: '行', reading: 'い' }, { text: 'きますか', reading: null }], romaji: 'kono densha wa shinjuku ni ikimasu ka', zh: '這台電車有到新宿嗎？', tokens: ['この電車は', '新宿に', '行きますか'] },
            { jp: '切符はどこで買えますか', segments: [{ text: '切符', reading: 'きっぷ' }, { text: 'はどこで', reading: null }, { text: '買', reading: 'か' }, { text: 'えますか', reading: null }], romaji: 'kippu wa doko de kaemasu ka', zh: '車票在哪裡買？', tokens: ['切符は', 'どこで', '買えますか'] },
            { jp: '乗り換えが必要ですか', segments: [{ text: '乗', reading: 'の' }, { text: 'り', reading: null }, { text: '換', reading: 'か' }, { text: 'えが', reading: null }, { text: '必要', reading: 'ひつよう' }, { text: 'ですか', reading: null }], romaji: 'norikae ga hitsuyou desu ka', zh: '需要轉乘嗎？', tokens: ['乗り換えが', '必要', 'ですか'] },
            { jp: 'バス停はどこですか', segments: [{ text: 'バス', reading: null }, { text: '停', reading: 'てい' }, { text: 'はどこですか', reading: null }], romaji: 'basutei wa doko desu ka', zh: '公車站在哪裡？', tokens: ['バス停は', 'どこ', 'ですか'] },
            { jp: 'ここで降ります', segments: [{ text: 'ここで', reading: null }, { text: '降', reading: 'お' }, { text: 'ります', reading: null }], romaji: 'koko de orimasu', zh: '我要在這裡下車', tokens: ['ここで', '降ります'] },
            { jp: '一日乗車券はありますか', segments: [{ text: '一日', reading: 'いちにち' }, { text: '乗車券', reading: 'じょうしゃけん' }, { text: 'はありますか', reading: null }], romaji: 'ichinichi joushaken wa arimasu ka', zh: '有一日乘車券嗎？', tokens: ['一日乗車券は', 'あり', 'ますか'] },
            { jp: '終電は何時ですか', segments: [{ text: '終電', reading: 'しゅうでん' }, { text: 'は', reading: null }, { text: '何時', reading: 'なんじ' }, { text: 'ですか', reading: null }], romaji: 'shuuden wa nanji desu ka', zh: '末班電車是幾點？', tokens: ['終電は', '何時', 'ですか'] }
        ]
    }
];
