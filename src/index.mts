import http from 'node:http';
import dotenv from 'dotenv';
import { database } from './database/database.ts';
import { METHODS } from './constants/methods.ts';

dotenv.config({ path: './.env' });
console.log(process.env.PORT);
const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  if (req.url === '/api/users') {
    if (req.method === METHODS.GET) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(database));
      return;
    }

    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      data: 'This route is not participating in the app',
    }),
  );
});

server.listen(PORT, () => console.log(`Server is running on the ${PORT} port`));
