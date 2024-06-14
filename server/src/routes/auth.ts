import express from 'express';
import createHttpError from 'http-errors';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../config';
import { prisma } from '../db';
import { SessionUser } from '../types/SessionUser';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      // check if user known
      const federatedCredentials = await prisma.federatedCredentials.findFirst({
        where: {
          provider: 'google',
          externalId: profile.id,
        },
        include: {
          user: true,
        },
      });

      // user known -> save user to session
      if (federatedCredentials) return done(null, federatedCredentials.user);

      // user not known -> create it
      const firstname = profile.name?.givenName;
      const lastname = profile.name?.familyName;
      const email = profile.emails?.find((e) => e.verified === true)?.value;

      if (!firstname || !lastname || !email) {
        throw createHttpError(500, 'Google API returned invalid data');
      }

      const user = await prisma.user.create({
        data: {
          email,
          firstname,
          lastname,
        },
      });

      await prisma.federatedCredentials.create({
        data: {
          provider: 'google',
          externalId: profile.id,
          userId: user.id,
        },
      });

      done(null, user);
    },
  ),
);

passport.serializeUser<SessionUser>((user, done) => {
  console.log('serialize');
  process.nextTick(() =>
    done(null, {
      id: user.id,
      firstname: user.firstname,
    }),
  );
});

passport.deserializeUser<SessionUser>((sessionUser, done) => {
  console.log('deserialize');
  process.nextTick(async () => {
    const user = await prisma.user.findFirstOrThrow({ where: { id: sessionUser.id } });
    done(null, user);
  });
});

// ---- ROUTER ----
export const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google'));
authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successReturnToOrRedirect: '/',
  }),
);
