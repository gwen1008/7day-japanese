import { renderTable } from './table.js';
import { renderRowSelection, toggleOption, setSingleOption, selectAllRows, clearAllRows, startQuiz, quitQuiz } from './quiz.js';
import { initWritingPractice, setWriteType, prevWriteChar, nextWriteChar, clearCanvas, playCurrentAudio, playExampleAudio, renderGuideCanvas } from './write.js';
import { initPhrases } from './phrases.js';
import { startVocabQuiz, quitVocabQuiz } from './vocab-quiz.js';
import { startSentenceQuiz, checkSentenceAnswer, quitSentenceQuiz } from './sentence-quiz.js';
import { initAiChat, saveApiKey, clearApiKey, sendAiMessage } from './ai-chat.js';

// 切換分頁
const allTabs = ['table', 'quiz', 'write', 'phrases', 'ai'];

// 測驗練習分頁內的子分類切換 (假名測驗 / 詞彙測驗 / 句子排序)
const quizModes = ['kana', 'vocab', 'sentence'];
function switchQuizMode(mode) {
    quizModes.forEach(m => {
        document.getElementById(`quiz-mode-${m}`).classList.toggle('hidden', m !== mode);
        const btn = document.getElementById(`quiz-mode-btn-${m}`);
        if (m === mode) {
            btn.classList.add('selected', 'border-blue-500', 'bg-blue-500', 'text-white');
            btn.classList.remove('border-gray-300', 'text-gray-700');
        } else {
            btn.classList.remove('selected', 'border-blue-500', 'bg-blue-500', 'text-white');
            btn.classList.add('border-gray-300', 'text-gray-700');
        }
    });
}
function switchTab(tabId) {
    allTabs.forEach(id => {
        document.getElementById(`tab-${id}`).classList.add('hidden-tab');
        document.getElementById(`nav-${id}`).className = 'flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-full font-medium text-sm text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 transition-colors';
    });

    document.getElementById(`tab-${tabId}`).classList.remove('hidden-tab');
    document.getElementById(`nav-${tabId}`).className = 'flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-full font-medium text-sm text-white bg-blue-500 shadow-md transition-colors';

    if (tabId === 'write') {
        renderGuideCanvas();
    }
}

// 初始化應用程式
function init() {
    renderTable();
    renderRowSelection();

    // 預設選取平假名
    const hiraBtn = document.querySelector('button[data-type="hiragana"]');
    if (hiraBtn) toggleOption(hiraBtn, 'type');

    initWritingPractice();
    initPhrases();
    initAiChat();
}

// 將 HTML 內 inline onclick 需要呼叫的函式掛上全域，模組內其餘函式維持私有
window.switchTab = switchTab;
window.toggleOption = toggleOption;
window.setSingleOption = setSingleOption;
window.selectAllRows = selectAllRows;
window.clearAllRows = clearAllRows;
window.startQuiz = startQuiz;
window.quitQuiz = quitQuiz;
window.setWriteType = setWriteType;
window.prevWriteChar = prevWriteChar;
window.nextWriteChar = nextWriteChar;
window.clearCanvas = clearCanvas;
window.playCurrentAudio = playCurrentAudio;
window.playExampleAudio = playExampleAudio;
window.renderGuideCanvas = renderGuideCanvas;
window.switchQuizMode = switchQuizMode;
window.startVocabQuiz = startVocabQuiz;
window.quitVocabQuiz = quitVocabQuiz;
window.startSentenceQuiz = startSentenceQuiz;
window.checkSentenceAnswer = checkSentenceAnswer;
window.quitSentenceQuiz = quitSentenceQuiz;
window.saveApiKey = saveApiKey;
window.clearApiKey = clearApiKey;
window.sendAiMessage = sendAiMessage;

// Tailwind CSS animation extension (for shake effect)
tailwind.config = {
    theme: {
        extend: {
            animation: {
                shake: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
            },
            keyframes: {
                shake: {
                    '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
                    '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
                    '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
                    '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
                }
            }
        }
    }
};

// type="module" 腳本本身就是延遲執行，DOM 已解析完成，可直接初始化
init();
