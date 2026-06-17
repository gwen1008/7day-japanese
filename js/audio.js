// 共用發音播放 (Web Speech API，無外部音檔)
let cachedJaVoice = null;
function getJapaneseVoice() {
    if (cachedJaVoice) return cachedJaVoice;
    const voices = speechSynthesis.getVoices();
    cachedJaVoice = voices.find(v => v.lang === 'ja-JP') || voices.find(v => v.lang && v.lang.startsWith('ja')) || null;
    return cachedJaVoice;
}

export function speak(text, rate = 0.85) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel(); // 避免播放排隊堆疊
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'ja-JP';
    const voice = getJapaneseVoice();
    if (voice) utter.voice = voice;
    utter.rate = rate;
    speechSynthesis.speak(utter);
}

// Chrome 等瀏覽器的語音清單為非同步載入，載入完成後重新快取
if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = () => { cachedJaVoice = null; };
}
