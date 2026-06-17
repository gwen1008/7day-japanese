const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };

http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const filePath = path.join(root, urlPath === '/' ? '/index.html' : urlPath);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Not found: ' + urlPath);
            return;
        }
        const ext = path.extname(filePath);
        res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
        res.end(data);
    });
}).listen(8765, () => console.log('listening on 8765'));
