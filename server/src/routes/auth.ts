import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../config';
import { prisma } from '../db';
import { logJson } from '../util/json';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      scope: ['profile'],
    },
    async (_accessToken, _refreshToken, profile, cb) => {
      const federatedCredentials = await prisma.federatedCredentials.findFirst({
        where: {
          provider: 'google',
          externalId: profile.id,
        },
        include: {
          user: true,
        },
      });

      console.log('fed', JSON.stringify(federatedCredentials, null, 2));

      if (federatedCredentials) return cb(null, federatedCredentials.user);

      const user = await prisma.user.create({
        data: {
          email: '' + Math.random(),
          name: profile.displayName,
        },
      });

      await prisma.federatedCredentials.create({
        data: {
          provider: 'google',
          externalId: profile.id,
          userId: user.id,
        },
      });

      console.log('user', JSON.stringify(user, null, 2));

      cb(null, user);
    }
  )
);

passport.serializeUser((user, cb) => {
  logJson('serialize', user);
  process.nextTick(() => cb(null, user));
});

passport.deserializeUser((user, cb) => {
  logJson('deserialize', user);
  process.nextTick(() => cb(null, user as any));
});

// ---- ROUTER ----
export const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google'));
authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successReturnToOrRedirect: '/',
  })
);
