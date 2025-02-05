const http = require('http');
const url = require('url');
const messages = require('./locals/en.json');

const dictionary = []; // Dictionary array to store word: definition pairs
let requestCount = 0; // Counter for the total number of requests

const server = http.createServer((req, res) => {
  requestCount++;
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  // Handle GET requests
  if (req.method === 'GET' && parsedUrl.pathname === '/api/definitions') {
    if (query.word) {
      const word = query.word.toLowerCase();
      const entry = dictionary.find(item => item.word === word);
      
      if (entry) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ definition: entry.definition }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: messages.definitionNotFound.replace('{word}', query.word) }));
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: messages.provideWordQuery }));
    }
  }
  // Handle POST requests
  else if (req.method === 'POST' && parsedUrl.pathname === '/api/definitions') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const { word, definition } = JSON.parse(body);

        if (!word || !definition) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: messages.provideWordAndDefinition }));
          return;
        }

        const lowerWord = word.toLowerCase();
        const existingEntry = dictionary.find(item => item.word === lowerWord);

        if (existingEntry) {
          res.writeHead(409, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: messages.entryAlreadyExists.replace('{word}', word) }));
        } else {
          dictionary.push({ word: lowerWord, definition });
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            message: messages.newEntryRecorded.replace('{word}', word).replace('{definition}', definition),
            totalRequests: requestCount,
            totalEntries: dictionary.length
          }));
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: messages.invalidJsonBody }));
      }
    });
  }
  // Handle unknown routes
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: messages.routeNotFound }));
  }
});

// Start the server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
