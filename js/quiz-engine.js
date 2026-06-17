import { shuffleArray } from './utils.js';

// 通用四選一測驗引擎：給定一組 DOM id 對應表，回傳可重複使用的測驗流程控制器
// 每個 question 物件需包含: q (題目顯示文字), a (正確答案), qClass (題目樣式),
// pool (所有可能答案，用來抽錯誤選項), optionClass (選項按鈕樣式)
export function createMultipleChoiceEngine(ids) {
    let questions = [];
    let index = 0;
    let score = 0;
    let mistakes = [];

    function el(id) {
        return document.getElementById(id);
    }

    function start(qs) {
        questions = qs;
        index = 0;
        score = 0;
        mistakes = [];

        el(ids.setup).classList.add('hidden');
        el(ids.result).classList.add('hidden');
        el(ids.area).classList.remove('hidden');

        el(ids.totalQNum).textContent = questions.length;
        el(ids.scoreDisplay).textContent = '0';

        loadQuestion();
    }

    function loadQuestion() {
        const q = questions[index];
        el(ids.currentQNum).textContent = index + 1;

        const qDisplay = el(ids.questionDisplay);
        qDisplay.textContent = q.q;
        qDisplay.className = q.qClass;

        let distractors = q.pool.filter(x => x !== q.a);
        distractors = shuffleArray(distractors.slice());
        let options = [q.a].concat(distractors.slice(0, 3));
        options = shuffleArray(options);

        const optionsContainer = el(ids.optionsContainer);
        optionsContainer.innerHTML = '';

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = q.optionClass;
            btn.textContent = opt;
            btn.onclick = () => checkAnswer(opt, q.a, btn);
            optionsContainer.appendChild(btn);
        });
    }

    function checkAnswer(selected, correct, btnElement) {
        const buttons = el(ids.optionsContainer).querySelectorAll('button');
        buttons.forEach(b => b.disabled = true);

        const isCorrect = selected === correct;
        const currentQ = questions[index];

        if (isCorrect) {
            btnElement.classList.remove('border-gray-200', 'hover:border-blue-400', 'hover:bg-blue-50');
            btnElement.classList.add('bg-green-500', 'text-white', 'border-green-600', 'transform', 'scale-105');
            score++;
            el(ids.scoreDisplay).textContent = score;
        } else {
            btnElement.classList.remove('border-gray-200', 'hover:border-blue-400', 'hover:bg-blue-50');
            btnElement.classList.add('bg-red-500', 'text-white', 'border-red-600', 'animate-shake');

            buttons.forEach(b => {
                if (b.textContent === correct) {
                    b.classList.remove('border-gray-200');
                    b.classList.add('border-green-500', 'bg-green-100', 'text-green-800');
                }
            });

            mistakes.push({
                question: currentQ.q,
                yourAnswer: selected,
                correctAnswer: correct
            });
        }

        setTimeout(() => {
            index++;
            if (index < questions.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }, isCorrect ? 800 : 1500);
    }

    function showResult() {
        el(ids.area).classList.add('hidden');
        el(ids.result).classList.remove('hidden');

        el(ids.finalScore).textContent = score;
        el(ids.finalTotal).textContent = questions.length;

        const percentage = score / questions.length;
        const icon = el(ids.resultIcon);

        if (percentage === 1) {
            icon.className = 'fas fa-crown text-yellow-400 drop-shadow-md';
        } else if (percentage >= 0.8) {
            icon.className = 'fas fa-star text-yellow-400 drop-shadow-md';
        } else if (percentage >= 0.6) {
            icon.className = 'fas fa-thumbs-up text-blue-400 drop-shadow-md';
        } else {
            icon.className = 'fas fa-book-open text-gray-400 drop-shadow-md';
        }

        const mistakesContainer = el(ids.mistakesContainer);
        const mistakesList = el(ids.mistakesList);
        mistakesList.innerHTML = '';

        if (mistakes.length > 0) {
            mistakesContainer.classList.remove('hidden');
            mistakes.forEach(m => {
                const li = document.createElement('li');
                li.className = 'bg-red-50 p-3 rounded-lg border border-red-100 flex justify-between items-center';
                li.innerHTML = `
                    <span class="text-xl font-bold">${m.question}</span>
                    <div class="text-right">
                        <span class="text-red-500 line-through mr-2">${m.yourAnswer}</span>
                        <i class="fas fa-arrow-right text-gray-400 mx-2 text-sm"></i>
                        <span class="text-green-600 font-bold">${m.correctAnswer}</span>
                    </div>
                `;
                mistakesList.appendChild(li);
            });
        } else {
            mistakesContainer.classList.add('hidden');
        }
    }

    function quit() {
        el(ids.area).classList.add('hidden');
        el(ids.result).classList.add('hidden');
        el(ids.setup).classList.remove('hidden');
    }

    return { start, quit };
}
