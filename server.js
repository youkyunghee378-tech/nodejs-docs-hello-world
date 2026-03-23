const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from Jenkins + Azure 🚀');
  }

  else if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
  }

  else {
    res.writeHead(404);
    res.end('Not Found');
  }

});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
