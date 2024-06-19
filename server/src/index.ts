import dotenv from 'dotenv';
dotenv.config();

import connectSqlite from 'connect-sqlite3';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import session, { Store } from 'express-session';
import createHttpError, { HttpError } from 'http-errors';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import { CLIENT_URL, HOST, NODE_ENV, PORT, SESSION_SECRET } from './config';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/users';

const isDev = NODE_ENV === 'development';
const SQLiteStore = connectSqlite(session);

const app = express();
app.use(morgan(isDev ? 'dev' : 'common'));
app.use(express.json());

// serve assets without session
const serveStatic = express.static(path.join(__dirname, '../../react-app/dist'));
app.get('*', (req, res, next) => {
  if (/(js|css|jpg|png|svg)$/.test(req.url)) return serveStatic(req, res, next);
  next();
});

// passport & session
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: { secure: !isDev, httpOnly: false, domain: isDev ? 'localhost' : undefined }, // only allow cookies via https if in a prod env
    store: new SQLiteStore({ db: 'sessions.db', dir: './db' }) as Store,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// setup dev env
if (isDev) {
  app.use(cors({ origin: CLIENT_URL, credentials: true }));

  app.use((req, res, next) => {
    const name = req.user ? `${req.user.firstname} ${req.user.lastname}` : 'UNKNOWN';
    res.setHeader('X-User-Name', name);
    res.setHeader('X-User-Mail', req.user?.email || 'UNKNOWN');
    next();
  });
}

// routers
app.use('/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api', (_req, _res, next) => next(createHttpError(404)));

// serve client app
app.get('*', (_req, res) => res.sendFile(path.join(__dirname, '../../react-app/dist/index.html')));

// 404 error handler
app.use((_req, _res, next) => next(createHttpError(404)));

// General error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  // render the error page
  res.status(err.status || 500);
  console.error('ERR', err);
  return res.json(isDev ? err : {});
});

app.listen({ hostname: HOST, port: PORT }, () => {
  console.log(`Listening on ${HOST}:${PORT}`);
});
