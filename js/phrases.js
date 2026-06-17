import { phraseCategories } from './phrases-data.js';
import { speak } from './audio.js';

const phraseState = { categoryIndex: 0 };

export function initPhrases() {
    renderPhraseCategoryTabs();
    renderPhraseList();
}

function renderPhraseCategoryTabs() {
    const container = document.getElementById('phrase-category-tabs');
    container.innerHTML = '';

    phraseCategories.forEach((cat, idx) => {
        const btn = document.createElement('button');
        const isActive = idx === phraseState.categoryIndex;
        btn.className = 'option-btn border-2 rounded-lg px-4 py-2 font-medium' +
            (isActive ? ' selected border-blue-500 bg-blue-500 text-white' : ' border-gray-300 text-gray-700');
        btn.innerHTML = `<i class="fas ${cat.icon} mr-2"></i>${cat.label}`;
        btn.onclick = () => {
            phraseState.categoryIndex = idx;
            renderPhraseCategoryTabs();
            renderPhraseList();
        };
        container.appendChild(btn);
    });
}

// 將句子拆解片段轉成帶注音 (furigana) 的 HTML，只有漢字片段才會標讀音
function renderFurigana(segments) {
    return segments.map(seg => seg.reading
        ? `<ruby>${seg.text}<rt>${seg.reading}</rt></ruby>`
        : seg.text
    ).join('');
}

function renderPhraseList() {
    const container = document.getElementById('phrase-list');
    container.innerHTML = '';

    const category = phraseCategories[phraseState.categoryIndex];
    category.phrases.forEach(p => {
        const item = document.createElement('div');
        item.className = 'border border-gray-200 rounded-lg p-4 flex items-center justify-between gap-4 hover:bg-blue-50 transition-colors';
        item.innerHTML = `
            <div>
                <div class="text-2xl font-bold text-gray-900 leading-loose">${renderFurigana(p.segments)}</div>
                <div class="text-xs font-mono text-green-600 mt-1">${p.romaji}</div>
                <div class="text-sm text-gray-400 mt-1">${p.zh}</div>
            </div>
        `;

        const playBtn = document.createElement('button');
        playBtn.className = 'text-blue-500 hover:text-blue-700 text-xl flex-shrink-0';
        playBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        playBtn.title = '播放發音';
        playBtn.onclick = () => speak(p.jp);

        item.appendChild(playBtn);
        container.appendChild(item);
    });
}
