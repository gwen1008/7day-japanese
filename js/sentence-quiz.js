import { phraseCategories } from './phrases-data.js';
import { shuffleArray } from './utils.js';
import { speak } from './audio.js';

const sentenceState = {
    questions: [],
    index: 0,
    score: 0,
    mistakes: [],
    available: [], // 目前還沒被選用的詞彙片段
    answer: []      // 使用者已排好的詞彙片段
};

// 只取有 tokens 切分 (長度 >= 2) 的句子，單一固定短語不適合排序練習
function buildSentencePool() {
    const pool = [];
    phraseCategories.forEach(cat => {
        cat.phrases.forEach(p => {
            if (p.tokens && p.tokens.length >= 2) {
                pool.push({ zh: p.zh, jp: p.jp, tokens: p.tokens });
            }
        });
    });
    return pool;
}

export function startSentenceQuiz() {
    const pool = shuffleArray(buildSentencePool());

    const countSelect = document.getElementById('sentence-question-count').value;
    let count = pool.length;
    if (countSelect !== 'all') {
        count = Math.min(parseInt(countSelect, 10), pool.length);
    }

    sentenceState.questions = pool.slice(0, count);
    if (sentenceState.questions.length === 0) {
        alert('沒有可用的句子題目');
        return;
    }

    sentenceState.index = 0;
    sentenceState.score = 0;
    sentenceState.mistakes = [];

    document.getElementById('sentence-setup').classList.add('hidden');
    document.getElementById('sentence-result').classList.add('hidden');
    document.getElementById('sentence-area').classList.remove('hidden');
    document.getElementById('sentence-total-q-num').textContent = sentenceState.questions.length;
    document.getElementById('sentence-score-display').textContent = '0';

    loadSentenceQuestion();
}

function loadSentenceQuestion() {
    const q = sentenceState.questions[sentenceState.index];
    document.getElementById('sentence-current-q-num').textContent = sentenceState.index + 1;
    document.getElementById('sentence-prompt-zh').textContent = q.zh;
    document.getElementById('sentence-feedback').textContent = '';
    document.getElementById('sentence-check-btn').disabled = false;

    sentenceState.available = shuffleArray(q.tokens.slice());
    sentenceState.answer = [];

    renderTokenPool();
    renderAnswerArea();
}

function renderTokenPool() {
    const container = document.getElementById('sentence-token-pool');
    container.innerHTML = '';
    sentenceState.available.forEach((token, idx) => {
        const btn = document.createElement('button');
        btn.className = 'bg-white border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-800 px-4 py-2 rounded-lg font-bold text-lg';
        btn.textContent = token;
        btn.onclick = () => {
            sentenceState.answer.push(token);
            sentenceState.available.splice(idx, 1);
            renderTokenPool();
            renderAnswerArea();
        };
        container.appendChild(btn);
    });
}

function renderAnswerArea() {
    const container = document.getElementById('sentence-answer-area');
    container.innerHTML = '';
    sentenceState.answer.forEach((token, idx) => {
        const btn = document.createElement('button');
        btn.className = 'bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-lg';
        btn.textContent = token;
        btn.onclick = () => {
            sentenceState.answer.splice(idx, 1);
            sentenceState.available.push(token);
            renderTokenPool();
            renderAnswerArea();
        };
        container.appendChild(btn);
    });
}

export function checkSentenceAnswer() {
    const q = sentenceState.questions[sentenceState.index];
    const userSentence = sentenceState.answer.join('');
    const correctSentence = q.tokens.join('');
    const isCorrect = sentenceState.available.length === 0 && userSentence === correctSentence;

    document.getElementById('sentence-check-btn').disabled = true;

    const feedback = document.getElementById('sentence-feedback');
    if (isCorrect) {
        feedback.textContent = '✓ 正確！';
        feedback.className = 'mt-3 font-bold text-green-600';
        sentenceState.score++;
        document.getElementById('sentence-score-display').textContent = sentenceState.score;
    } else {
        feedback.textContent = `✗ 正確答案：${q.jp}`;
        feedback.className = 'mt-3 font-bold text-red-500';
        sentenceState.mistakes.push({
            question: q.zh,
            yourAnswer: userSentence || '(未排列)',
            correctAnswer: q.jp
        });
    }
    speak(q.jp);

    setTimeout(() => {
        sentenceState.index++;
        if (sentenceState.index < sentenceState.questions.length) {
            loadSentenceQuestion();
        } else {
            showSentenceResult();
        }
    }, isCorrect ? 1200 : 2200);
}

function showSentenceResult() {
    document.getElementById('sentence-area').classList.add('hidden');
    document.getElementById('sentence-result').classList.remove('hidden');

    document.getElementById('sentence-final-score').textContent = sentenceState.score;
    document.getElementById('sentence-final-total').textContent = sentenceState.questions.length;

    const percentage = sentenceState.score / sentenceState.questions.length;
    const icon = document.getElementById('sentence-result-icon');

    if (percentage === 1) {
        icon.className = 'fas fa-crown text-yellow-400 drop-shadow-md';
    } else if (percentage >= 0.8) {
        icon.className = 'fas fa-star text-yellow-400 drop-shadow-md';
    } else if (percentage >= 0.6) {
        icon.className = 'fas fa-thumbs-up text-blue-400 drop-shadow-md';
    } else {
        icon.className = 'fas fa-book-open text-gray-400 drop-shadow-md';
    }

    const mistakesContainer = document.getElementById('sentence-mistakes-container');
    const mistakesList = document.getElementById('sentence-mistakes-list');
    mistakesList.innerHTML = '';

    if (sentenceState.mistakes.length > 0) {
        mistakesContainer.classList.remove('hidden');
        sentenceState.mistakes.forEach(m => {
            const li = document.createElement('li');
            li.className = 'bg-red-50 p-3 rounded-lg border border-red-100';
            li.innerHTML = `
                <div class="text-sm text-gray-500">${m.question}</div>
                <div class="text-red-500 line-through">${m.yourAnswer}</div>
                <div class="text-green-600 font-bold">${m.correctAnswer}</div>
            `;
            mistakesList.appendChild(li);
        });
    } else {
        mistakesContainer.classList.add('hidden');
    }
}

export function quitSentenceQuiz() {
    document.getElementById('sentence-area').classList.add('hidden');
    document.getElementById('sentence-result').classList.add('hidden');
    document.getElementById('sentence-setup').classList.remove('hidden');
}
