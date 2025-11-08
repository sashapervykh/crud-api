import http from 'node:http';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
console.log(process.env.PORT);
const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      data: 'Hello World! It is beginning of the CRUD',
    }),
  );
});

server.listen(PORT, () => console.log(`Server is running on the ${PORT} port`));
