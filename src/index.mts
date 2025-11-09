import http from 'node:http';
import dotenv from 'dotenv';
import { BASE_LINK } from './constants/path.ts';
import { handleAllUsersRequest } from './handlers/handleAllUsersRequest/handleAllUsersRequest.ts';
import { handleOneUserRequest } from './handlers/handleOneUserRequesr/handleOneUserRequest.ts';

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  switch (true) {
    case req.url === BASE_LINK || req.url === `${BASE_LINK}/`: {
      handleAllUsersRequest(req, res);
      break;
    }
    case req.url?.startsWith(`${BASE_LINK}/`): {
      handleOneUserRequest(req, res);
      break;
    }
    default: {
      res.writeHead(404);
      res.end('Requested resource does not exist! Check your link please...');
      return;
    }
  }
});

if (process.env.NODE_ENV !== 'test')
  server.listen(PORT, () =>
    console.log(`Server is running on the ${PORT} port`),
  );

export default server;
