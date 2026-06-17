import { gojuonData } from './data.js';
import { shuffleArray } from './utils.js';
import { createMultipleChoiceEngine } from './quiz-engine.js';

// 測驗設定狀態
export const quizConfig = {
    types: [], // 'hiragana', 'katakana'
    mode: 'kana-to-romaji', // 'kana-to-romaji', 'romaji-to-kana'
    rows: [] // 'a', 'k', 's'...
};

const kanaEngine = createMultipleChoiceEngine({
    setup: 'quiz-setup',
    area: 'quiz-area',
    result: 'quiz-result',
    currentQNum: 'current-q-num',
    totalQNum: 'total-q-num',
    scoreDisplay: 'score-display',
    questionDisplay: 'question-display',
    optionsContainer: 'options-container',
    finalScore: 'final-score',
    finalTotal: 'final-total',
    resultIcon: 'result-icon',
    mistakesContainer: 'mistakes-container',
    mistakesList: 'mistakes-list'
});

// 渲染範圍選擇按鈕
export function renderRowSelection() {
    const container = document.getElementById('row-selection');
    container.innerHTML = '';

    gojuonData.forEach(data => {
        const btn = document.createElement('button');
        btn.className = 'option-btn border-2 border-gray-300 rounded-lg px-2 py-2 font-medium text-sm flex flex-col items-center justify-center h-16';
        btn.dataset.row = data.row;
        btn.onclick = () => toggleOption(btn, 'row');

        // 顯示該行的代表字
        const repChar = data.chars[0].hira;
        btn.innerHTML = `
            <span class="text-lg">${repChar}</span>
            <span class="text-xs text-gray-500">${data.label}</span>
        `;
        container.appendChild(btn);
    });
}

// 切換複選選項 (字體類型、範圍)
export function toggleOption(btn, category) {
    btn.classList.toggle('selected');
    if (btn.classList.contains('selected')) {
        btn.classList.remove('border-gray-300', 'text-gray-700');
        btn.classList.add('border-blue-500', 'bg-blue-500', 'text-white');
    } else {
        btn.classList.add('border-gray-300', 'text-gray-700');
        btn.classList.remove('border-blue-500', 'bg-blue-500', 'text-white');
    }
    updateConfig();
}

// 設定單選選項 (題型)
export function setSingleOption(btn, category) {
    const siblings = btn.parentElement.querySelectorAll('button');
    siblings.forEach(b => {
        b.classList.remove('selected', 'border-blue-500', 'bg-blue-500', 'text-white');
        b.classList.add('border-gray-300', 'text-gray-700');
    });
    btn.classList.add('selected', 'border-blue-500', 'bg-blue-500', 'text-white');
    btn.classList.remove('border-gray-300');
    updateConfig();
}

export function selectAllRows() {
    document.querySelectorAll('#row-selection button').forEach(btn => {
        if (!btn.classList.contains('selected')) toggleOption(btn, 'row');
    });
}

export function clearAllRows() {
    document.querySelectorAll('#row-selection button').forEach(btn => {
        if (btn.classList.contains('selected')) toggleOption(btn, 'row');
    });
}

// 更新設定物件
function updateConfig() {
    quizConfig.types = Array.from(document.querySelectorAll('button[data-type].selected')).map(b => b.dataset.type);
    const modeBtn = document.querySelector('button[data-mode].selected');
    if (modeBtn) quizConfig.mode = modeBtn.dataset.mode;
    quizConfig.rows = Array.from(document.querySelectorAll('button[data-row].selected')).map(b => b.dataset.row);

    document.getElementById('setup-error').classList.add('hidden');
}

// 收集所有可能的答案，作為錯誤選項的抽選池
function buildAnswerUniverse(mode, type) {
    const universe = [];
    gojuonData.forEach(row => {
        row.chars.forEach(char => {
            if (char.romaji === '') return;
            if (mode === 'kana-to-romaji') {
                if (!universe.includes(char.romaji)) universe.push(char.romaji);
            } else if (type === 'hira') {
                if (!universe.includes(char.hira)) universe.push(char.hira);
            } else if (type === 'kata') {
                if (!universe.includes(char.kata)) universe.push(char.kata);
            }
        });
    });
    return universe;
}

// 開始測驗
export function startQuiz() {
    updateConfig();

    if (quizConfig.types.length === 0 || quizConfig.rows.length === 0) {
        document.getElementById('setup-error').classList.remove('hidden');
        return;
    }

    // 準備題庫
    let pool = [];
    quizConfig.rows.forEach(rowId => {
        const rowData = gojuonData.find(d => d.row === rowId);
        rowData.chars.forEach(char => {
            if (char.romaji !== '') { // 排除空白欄位 (如 yi, ye)
                if (quizConfig.types.includes('hiragana')) {
                    pool.push({ q: char.hira, a: char.romaji, type: 'hira' });
                }
                if (quizConfig.types.includes('katakana')) {
                    pool.push({ q: char.kata, a: char.romaji, type: 'kata' });
                }
            }
        });
    });

    // 如果題型是拼音選假名，反轉問答
    if (quizConfig.mode === 'romaji-to-kana') {
        pool = pool.map(item => ({ q: item.a, a: item.q, type: item.type }));
    }

    // 打亂題庫
    pool = shuffleArray(pool);

    // 決定題數
    const countSelect = document.getElementById('question-count').value;
    let questionCount = pool.length;
    if (countSelect !== 'all') {
        questionCount = Math.min(parseInt(countSelect), pool.length);
    }
    pool = pool.slice(0, questionCount);

    if (pool.length === 0) {
        alert("選擇的範圍內沒有題目！");
        return;
    }

    // 依模式準備抽錯誤選項用的答案池與顯示樣式
    const romajiUniverse = quizConfig.mode === 'kana-to-romaji' ? buildAnswerUniverse('kana-to-romaji') : null;
    const hiraUniverse = quizConfig.mode === 'romaji-to-kana' ? buildAnswerUniverse('romaji-to-kana', 'hira') : null;
    const kataUniverse = quizConfig.mode === 'romaji-to-kana' ? buildAnswerUniverse('romaji-to-kana', 'kata') : null;

    const questions = pool.map(item => {
        if (quizConfig.mode === 'kana-to-romaji') {
            return {
                q: item.q,
                a: item.a,
                qClass: `text-8xl font-bold mb-12 ${item.type === 'hira' ? 'text-black' : 'text-blue-600'}`,
                pool: romajiUniverse,
                optionClass: 'bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-800 py-4 px-6 rounded-xl shadow-sm transition-all text-center font-mono text-2xl'
            };
        }
        return {
            q: item.q,
            a: item.a,
            qClass: 'text-7xl font-mono text-green-600 mb-12',
            pool: item.type === 'hira' ? hiraUniverse : kataUniverse,
            optionClass: 'bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-800 py-4 px-6 rounded-xl shadow-sm transition-all text-center font-bold text-3xl'
        };
    });

    kanaEngine.start(questions);
}

// 退出測驗
export function quitQuiz() {
    kanaEngine.quit();
}
