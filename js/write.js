import { gojuonData } from './data.js';
import { speak } from './audio.js';

// ===== 字帖練習區 =====
export const writeState = {
    type: 'hiragana', // 'hiragana' | 'katakana'
    list: [],         // 目前文字類型的可練習字元清單
    index: 0,
    isDrawing: false,
    lastX: 0,
    lastY: 0
};

function buildWriteList() {
    const list = [];
    gojuonData.forEach(rowData => {
        rowData.chars.forEach(char => {
            if (char.romaji !== '') {
                list.push(char);
            }
        });
    });
    return list;
}

export function initWritingPractice() {
    writeState.list = buildWriteList();
    renderWriteKanaGrid();
    selectWriteChar(0);
    setupDrawCanvas();
}

// 渲染左側可選文字格
function renderWriteKanaGrid() {
    const container = document.getElementById('write-kana-grid');
    container.innerHTML = '';

    writeState.list.forEach((char, idx) => {
        const btn = document.createElement('button');
        const display = writeState.type === 'hiragana' ? char.hira : char.kata;
        btn.className = 'option-btn border-2 border-gray-300 rounded-lg py-2 font-bold text-lg' + (idx === writeState.index ? ' selected border-blue-500 bg-blue-500 text-white' : '');
        btn.textContent = display;
        btn.onclick = () => selectWriteChar(idx);
        container.appendChild(btn);
    });
}

// 切換 平假名/片假名
export function setWriteType(btn, type) {
    const siblings = btn.parentElement.querySelectorAll('button');
    siblings.forEach(b => {
        b.classList.remove('selected', 'border-blue-500', 'bg-blue-500', 'text-white');
        b.classList.add('border-gray-300');
    });
    btn.classList.add('selected', 'border-blue-500', 'bg-blue-500', 'text-white');
    btn.classList.remove('border-gray-300');

    writeState.type = type;
    writeState.index = 0;
    renderWriteKanaGrid();
    selectWriteChar(0);
}

// 選擇要練習的字元
function selectWriteChar(idx) {
    writeState.index = idx;
    const char = writeState.list[idx];

    document.getElementById('write-romaji').textContent = char.romaji;
    document.getElementById('write-kanji-origin').textContent =
        (writeState.type === 'hiragana' ? char.kanjiHira : char.kanjiKata) || '—';

    // 更新格子的選取樣式
    document.querySelectorAll('#write-kana-grid button').forEach((b, i) => {
        if (i === idx) {
            b.classList.add('selected', 'border-blue-500', 'bg-blue-500', 'text-white');
        } else {
            b.classList.remove('selected', 'border-blue-500', 'bg-blue-500', 'text-white');
        }
    });

    updateExampleWord(char);

    clearCanvas();
    renderGuideCanvas();

    if (document.getElementById('auto-play').checked) {
        playCurrentAudio();
    }
}

// 範例詞彙只在練習平假名時顯示 (片假名字母多為外來語組成，沒有對應的原生範例詞)
function updateExampleWord(char) {
    const box = document.getElementById('example-word-box');
    if (writeState.type !== 'hiragana' || !char.example) {
        box.classList.add('hidden');
        return;
    }
    box.classList.remove('hidden');
    document.getElementById('example-word').textContent = char.example.word;
    document.getElementById('example-romaji').textContent = char.example.romaji;
    document.getElementById('example-zh').textContent = char.example.zh;
}

export function prevWriteChar() {
    const newIndex = (writeState.index - 1 + writeState.list.length) % writeState.list.length;
    selectWriteChar(newIndex);
}

export function nextWriteChar() {
    const newIndex = (writeState.index + 1) % writeState.list.length;
    selectWriteChar(newIndex);
}

// 繪製底層字帖格線與淡色範例字
export function renderGuideCanvas() {
    const canvas = document.getElementById('guide-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // 米字格輔助線
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h);
    ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
    ctx.moveTo(0, 0); ctx.lineTo(w, h);
    ctx.moveTo(w, 0); ctx.lineTo(0, h);
    ctx.stroke();

    // 外框
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, w - 2, h - 2);

    // 淡色範例字 (供描繪)
    const showGuide = document.getElementById('show-guide-char').checked;
    if (showGuide) {
        const char = writeState.list[writeState.index];
        const display = writeState.type === 'hiragana' ? char.hira : char.kata;
        ctx.fillStyle = '#d1d5db';
        ctx.font = `${h * 0.7}px 'Noto Sans JP', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(display, w / 2, h / 2 + h * 0.03);
    }
}

// 設定書寫畫布的互動事件 (滑鼠/觸控通用)
function setupDrawCanvas() {
    const canvas = document.getElementById('draw-canvas');
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1f2937';

    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: (clientX - rect.left) * (canvas.width / rect.width),
            y: (clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    function start(e) {
        e.preventDefault();
        writeState.isDrawing = true;
        const pos = getPos(e);
        writeState.lastX = pos.x;
        writeState.lastY = pos.y;
    }

    function move(e) {
        if (!writeState.isDrawing) return;
        e.preventDefault();
        const pos = getPos(e);
        ctx.lineWidth = parseInt(document.getElementById('pen-size').value, 10);
        ctx.beginPath();
        ctx.moveTo(writeState.lastX, writeState.lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        writeState.lastX = pos.x;
        writeState.lastY = pos.y;
    }

    function end() {
        writeState.isDrawing = false;
    }

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('mouseleave', end);

    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', end);
}

// 清除書寫畫布 (保留底層字帖)
export function clearCanvas() {
    const canvas = document.getElementById('draw-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function playCurrentAudio() {
    const char = writeState.list[writeState.index];
    const text = writeState.type === 'hiragana' ? char.hira : char.kata;
    speak(text);
}

export function playExampleAudio() {
    const char = writeState.list[writeState.index];
    if (char.example) speak(char.example.word);
}
