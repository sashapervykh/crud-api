import { type IncomingMessage, type ServerResponse } from 'node:http';
import { METHODS } from '../../constants/methods.ts';
import { database } from '../../database/database.ts';
import { validate } from 'uuid';

export function handleOneUserRequest(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  },
) {
  const urlSegments = req.url?.split('/').filter(Boolean);
  if (!urlSegments) {
    res.writeHead(500);
    res.end(
      'Unexpected error happened. Server did not receive information about requested resource.',
    );
    return;
  }

  if (!validate(urlSegments[2])) {
    res.writeHead(400);
    res.end('Received user id is not valid uuid');
    return;
  }

  const uuid = urlSegments[2];
  const requestedUser = database.getUser(uuid);

  if (!requestedUser) {
    res.writeHead(404);
    res.end('Requested user does not exist');
    return;
  }

  if (urlSegments?.length > 3) {
    res.writeHead(404);
    res.end('Requested resource does not exist! Please check your link...');
    return;
  }

  switch (req.method) {
    case METHODS.GET: {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(requestedUser));
      break;
    }
    case METHODS.DELETE: {
      database.deleteUser(uuid);
      res.writeHead(204);
      res.end();
      break;
    }
    case METHODS.PUT: {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(requestedUser));
      break;
    }
    default: {
      res.end(`Method ${req.method} is not supported for path /api/users`);
    }
  }
}
