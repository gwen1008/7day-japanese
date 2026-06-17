import { gojuonData, dans, danLabels } from './data.js';

// 渲染五十音表
export function renderTable() {
    const tbody = document.getElementById('gojuon-table-body');
    tbody.innerHTML = '';

    dans.forEach((dan, index) => {
        const tr = document.createElement('tr');
        tr.className = 'border-b hover:bg-gray-50';

        // 第一列：段名
        const th = document.createElement('td');
        th.className = 'p-2 border bg-gray-50 font-bold text-sm text-gray-600';
        th.textContent = danLabels[index];
        tr.appendChild(th);

        // 遍歷每一行 (a, k, s...) 但排除撥音
        gojuonData.filter(d => d.row !== 'n_special').forEach(rowData => {
            const td = document.createElement('td');
            td.className = 'p-2 border kana-cell';

            const charData = rowData.chars.find(c => c.dan === dan);

            if (charData && charData.hira) {
                td.innerHTML = `
                    <div class="text-xl font-bold text-black">${charData.hira}</div>
                    <div class="text-md text-blue-500">${charData.kata}</div>
                    <div class="text-xs font-mono text-green-600">${charData.romaji}</div>
                `;
            }
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });

    // 處理撥音 (獨立一行)
    const nTr = document.createElement('tr');
    const nTh = document.createElement('td');
    nTh.className = 'p-2 border bg-gray-50 font-bold text-sm text-gray-600';
    nTh.textContent = '撥音';
    nTr.appendChild(nTh);

    const nTd = document.createElement('td');
    nTd.className = 'p-2 border kana-cell';
    nTd.colSpan = 10; // 跨越所有行
    const nChar = gojuonData.find(d => d.row === 'n_special').chars[0];
    nTd.innerHTML = `
        <div class="flex justify-center items-center space-x-6">
            <div class="text-xl font-bold text-black">${nChar.hira}</div>
            <div class="text-xl text-blue-500">${nChar.kata}</div>
            <div class="text-lg font-mono text-green-600">${nChar.romaji}</div>
        </div>
    `;
    nTr.appendChild(nTd);
    tbody.appendChild(nTr);
}
