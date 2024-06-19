import { Router } from 'express';
import { ensureLoggedIn } from '../util/ensureLoggedIn';
import { prisma } from '../db';

export const userRouter = Router();

userRouter.get('/', ensureLoggedIn, (_req, res, next) =>
  prisma.user
    .findMany()
    .then((users) => res.json(users))
    .catch(next),
);

userRouter.get('/me', ensureLoggedIn, (req, res) => res.json(req.user));
