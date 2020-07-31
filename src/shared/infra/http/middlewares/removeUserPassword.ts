import { Request, Response, NextFunction } from 'express';
// import User from '../../../../modules/users/entities/User';

export default function removeUserPassword(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  next();
}
