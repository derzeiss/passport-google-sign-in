import { NextFunction, Request, Response } from 'express';

export const ensureLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.sendStatus(401);
};
