import { gojuonData } from './data.js';
import { shuffleArray } from './utils.js';
import { createMultipleChoiceEngine } from './quiz-engine.js';

const vocabEngine = createMultipleChoiceEngine({
    setup: 'vocab-setup',
    area: 'vocab-quiz-area',
    result: 'vocab-quiz-result',
    currentQNum: 'vocab-current-q-num',
    totalQNum: 'vocab-total-q-num',
    scoreDisplay: 'vocab-score-display',
    questionDisplay: 'vocab-question-display',
    optionsContainer: 'vocab-options-container',
    finalScore: 'vocab-final-score',
    finalTotal: 'vocab-final-total',
    resultIcon: 'vocab-result-icon',
    mistakesContainer: 'vocab-mistakes-container',
    mistakesList: 'vocab-mistakes-list'
});

// 取出每個假名對應的範例詞彙，組成詞彙測驗題庫
function buildVocabPool() {
    const pool = [];
    gojuonData.forEach(row => {
        row.chars.forEach(char => {
            if (char.example) {
                pool.push({ word: char.example.word, romaji: char.example.romaji, zh: char.example.zh });
            }
        });
    });
    return pool;
}

export function startVocabQuiz() {
    const modeBtn = document.querySelector('#vocab-mode-options button.selected');
    const mode = modeBtn ? modeBtn.dataset.vocabMode : 'word-to-zh';

    const basePool = buildVocabPool();
    const allWords = basePool.map(v => v.word);
    const allZh = basePool.map(v => v.zh);

    let questions = basePool.map(v => mode === 'word-to-zh'
        ? {
            q: v.word,
            a: v.zh,
            qClass: 'text-5xl font-bold mb-12 text-gray-800',
            pool: allZh,
            optionClass: 'bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-800 py-4 px-6 rounded-xl shadow-sm transition-all text-center font-bold text-xl'
        }
        : {
            q: v.romaji,
            a: v.word,
            qClass: 'text-5xl font-mono text-green-600 mb-12',
            pool: allWords,
            optionClass: 'bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-800 py-4 px-6 rounded-xl shadow-sm transition-all text-center font-bold text-2xl'
        }
    );

    questions = shuffleArray(questions);

    const countSelect = document.getElementById('vocab-question-count').value;
    let count = questions.length;
    if (countSelect !== 'all') {
        count = Math.min(parseInt(countSelect, 10), questions.length);
    }

    vocabEngine.start(questions.slice(0, count));
}

export function quitVocabQuiz() {
    vocabEngine.quit();
}
