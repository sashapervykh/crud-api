import http from 'node:http';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      data: 'Hello World! It is beginning of the CRUD',
    }),
  );
});

server.listen(port);
