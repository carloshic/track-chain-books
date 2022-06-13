import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
export default function (request: Request) {
  if (!request) {
    return null;
  }

  const authorization = request.get('authorization') as string;

  if (authorization && authorization.split(' ').length > 1) {
    const token = authorization.split(' ')[1];

    try {
      const userPayload = jwt.verify(token, process.env.JWT_SECRET);

      return userPayload;
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
}
