import { type IncomingMessage, type ServerResponse } from 'node:http';
import { METHODS } from '../../constants/methods.ts';
import { database } from '../../database/database.ts';
import { validate } from 'uuid';
import { getTypeCheckedBody } from '../../utils/getTypeCheckedBody.ts';

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
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          const typedBody = getTypeCheckedBody(body);
          const updatedUser = { id: uuid, ...typedBody };
          database.updateUser(updatedUser);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(updatedUser));
        } catch (err) {
          let message: string = `Unknown error is occurred when updating user ${uuid}`;
          if (err instanceof Error) {
            message = err.message;
          }
          if (err instanceof SyntaxError) {
            message = `Body is not a valid JSON. ${err.message}`;
          }
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(
            `Invalid body was received with request. Error message: ${message}`,
          );
        }
      });
      break;
    }
    default: {
      res.end(`Method ${req.method} is not supported for path /api/users`);
    }
  }
}
