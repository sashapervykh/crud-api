import { type IncomingMessage, type ServerResponse } from 'node:http';
import { METHODS } from '../../constants/methods.ts';
import { database } from '../../database/database.ts';
import { handlePostToAllUsers } from './handlePostToAllUsers.ts';

export function handleAllUsersRequest(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  },
) {
  switch (req.method) {
    case METHODS.GET: {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(database.getAllUsers()));
      break;
    }
    case METHODS.POST: {
      handlePostToAllUsers(req, res);
      break;
    }
    default: {
      res.end(`Method ${req.method} is not supported for path /api/users`);
    }
  }
}
