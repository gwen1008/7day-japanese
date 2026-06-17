// AI 日文小幫手 — 呼叫 Groq API (OpenAI 相容格式)，免費額度、不需信用卡。
// API Key 只存在使用者瀏覽器的 localStorage，絕對不要把真實 Key 寫進這個檔案或任何其他原始碼，
// 否則部署成靜態網站後任何人「檢視原始碼」都能偷走這個 Key。
const API_KEY_STORAGE_KEY = 'jp_app_groq_api_key';
const MODEL_NAME = 'llama-3.3-70b-versatile'; // 若 Groq 更換可用模型名稱，改這裡即可
const MAX_HISTORY_TURNS = 20; // 避免對話歷史無限增長，超過時裁掉最舊的

const SYSTEM_INSTRUCTION = [
    '你是一個日文學習小幫手，專門協助使用者學習日文。',
    '只回答跟日文學習、日語會話練習、文法解釋、日文翻譯、日本旅遊溝通有關的問題。',
    '如果使用者問跟日文學習無關的問題（例如其他程式語言、時事新聞、其他國家語言學習等），',
    '請禮貌地說明你只能協助日文相關的內容，並引導對方提出日文相關的問題。',
    '回答可以中日文夾雜，日文部分盡量附上羅馬拼音或中文翻譯，方便初學者理解。'
].join('');

let chatHistory = []; // [{ role: 'user'|'assistant', content }]

function getSavedKey() {
    return localStorage.getItem(API_KEY_STORAGE_KEY);
}

function showKeySetup() {
    document.getElementById('ai-key-setup').classList.remove('hidden');
    document.getElementById('ai-chat-area').classList.add('hidden');
}

function showChatArea() {
    document.getElementById('ai-key-setup').classList.add('hidden');
    document.getElementById('ai-chat-area').classList.remove('hidden');
}

export function initAiChat() {
    if (getSavedKey()) {
        showChatArea();
    } else {
        showKeySetup();
    }

    document.getElementById('ai-input').addEventListener('keydown', e => {
        if (e.key === 'Enter') sendAiMessage();
    });
}

export function saveApiKey() {
    const input = document.getElementById('ai-key-input');
    const key = input.value.trim();
    if (!key) return;
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
    input.value = '';
    showChatArea();
}

export function clearApiKey() {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    chatHistory = [];
    document.getElementById('ai-messages').innerHTML = '';
    showKeySetup();
}

function appendMessage(role, text) {
    const container = document.getElementById('ai-messages');
    const bubble = document.createElement('div');
    bubble.className = role === 'user'
        ? 'bg-blue-500 text-white self-end ml-auto max-w-[80%] px-4 py-2 rounded-lg mb-2 whitespace-pre-wrap'
        : 'bg-gray-100 text-gray-800 max-w-[80%] px-4 py-2 rounded-lg mb-2 whitespace-pre-wrap';
    bubble.textContent = text;
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
    return bubble;
}

export async function sendAiMessage() {
    const input = document.getElementById('ai-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';

    appendMessage('user', text);
    chatHistory.push({ role: 'user', content: text });
    if (chatHistory.length > MAX_HISTORY_TURNS) {
        chatHistory = chatHistory.slice(chatHistory.length - MAX_HISTORY_TURNS);
    }

    const apiKey = getSavedKey();
    if (!apiKey) {
        appendMessage('assistant', '尚未設定 API Key，請先輸入你的 Groq API Key。');
        showKeySetup();
        return;
    }

    const thinkingBubble = appendMessage('assistant', '思考中...');

    try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                messages: [{ role: 'system', content: SYSTEM_INSTRUCTION }, ...chatHistory]
            })
        });

        const data = await res.json();
        thinkingBubble.remove();

        if (!res.ok) {
            const message = (data.error && data.error.message) || '請求失敗';
            appendMessage('assistant', `發生錯誤：${message}`);
            return;
        }

        const reply = data.choices && data.choices[0] && data.choices[0].message
            ? data.choices[0].message.content
            : '（沒有收到回覆，請再試一次）';

        appendMessage('assistant', reply);
        chatHistory.push({ role: 'assistant', content: reply });
    } catch (err) {
        thinkingBubble.remove();
        appendMessage('assistant', `連線發生錯誤：${err.message}`);
    }
}
