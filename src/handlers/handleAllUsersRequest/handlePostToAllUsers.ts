import { type IncomingMessage, type ServerResponse } from 'node:http';
import { database } from '../../database/database.ts';
import { getTypeCheckedBody } from '../../utils/getTypeCheckedBody.ts';
import { v4 as uuidv4 } from 'uuid';

export function handlePostToAllUsers(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  },
) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    try {
      const typedBody = getTypeCheckedBody(body);
      const uuid = uuidv4();
      const newUser = { id: uuid, ...typedBody };
      database.push(newUser);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } catch (err) {
      let message: string = 'Unknown error is occurred when creating new user';
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
}
