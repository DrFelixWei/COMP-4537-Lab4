const http = require('http');
const fs = require('fs');
const { Utils } = require('./modules/utils');
const messages = require('./locals/en.json');

class Server {
  constructor(port) {
    this.port = port;
    this.utils = new Utils();
  }

  start() {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, `http://${req.headers.host}`);

      // if (url.pathname === '/COMP4537/labs/3/getDate/' && url.searchParams.has('name')) {
      //   this.handleGetDate(url, res);
      // } else if (url.pathname === '/COMP4537/labs/3/writeFile/' && url.searchParams.has('text')) {
      //   this.handleWriteFile(url, res);
      // } else if (url.pathname.startsWith('/COMP4537/labs/3/readFile/')) {
      //   this.handleReadFile(url, res);
      // } else {
      //   res.writeHead(404, { 'Content-Type': 'text/html' });
      //   res.end('<div style="color: red;">Error: Invalid Request</div>');
      // }

    });

    server.listen(this.port, () => {
      console.log(`Server running at ${this.port}/`);
    });
  }


}

const port = 3000;
const app = new Server(port);
app.start();
