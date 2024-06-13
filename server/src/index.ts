import dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { HOST, NODE_ENV, PORT } from './config';
import createHttpError, { HttpError } from 'http-errors';
import path from 'path';
import { authRouter } from './routes/auth';
import session from 'express-session';
import passport from 'passport';
import connectSqlite from 'connect-sqlite3';

const isDev = NODE_ENV === 'development';
const SQLiteStore = connectSqlite(session);

const app = express();
if (isDev) app.use(cors());
app.use(morgan(isDev ? 'dev' : 'common'));
app.use(express.json());

app.use(
  session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: { secure: true },
    store: new SQLiteStore({ db: 'sessions.db', dir: './db' }) as any,
  })
);
app.use(passport.authenticate('session'));

// routers
app.use('/auth', authRouter);

// serve client app
app.use(express.static(path.join(__dirname, '../../react-app/dist')));
// app.get('*', (_req, res) => res.sendFile(path.join(__dirname, '../../react-app/dist/index.html')));

// 404 error handler
app.use((_req, _res, next) => next(createHttpError(404)));

// General error handler
app.use((err: HttpError, req: Request, res: Response, _next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.error('ERR', err);
  return res.json(isDev ? err : {});
});

app.listen({ hostname: HOST, port: PORT }, () => {
  console.log(`Listening on ${HOST}:${PORT}`);
});
