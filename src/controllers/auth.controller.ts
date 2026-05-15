import { Request, Response } from 'express';
import passport from '../auth/passport';
import {
  generateAccessToken,
  createSession,
  rotateSession,
  revokeSession,
} from '../services/auth.service';
import { env } from '../config/env';

const REFRESH_COOKIE = 'refresh_token';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/api/v1/auth',
  maxAge: env.jwtRefreshExpiresIn,
};

export const googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false,
});

export const googleCallback = [
  passport.authenticate('google', { session: false, failureRedirect: '/api/v1/auth/failure' }),
  async (req: Request, res: Response) => {
    const user = req.user!;

    const accessToken = generateAccessToken(user);
    const { refreshToken } = await createSession(user.id, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    res.cookie(REFRESH_COOKIE, refreshToken, COOKIE_OPTIONS);

    res.redirect(`${env.clientUrl}/auth/callback?token=${accessToken}`);
  },
];

export async function refresh(req: Request, res: Response) {
  const oldToken = req.cookies?.[REFRESH_COOKIE];
  if (!oldToken) {
    res.status(401).json({ error: 'No refresh token provided' });
    return;
  }

  const result = await rotateSession(oldToken, {
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  });

  if (!result) {
    res.clearCookie(REFRESH_COOKIE, { path: '/api/v1/auth' });
    res.status(401).json({ error: 'Invalid or expired refresh token' });
    return;
  }

  const accessToken = generateAccessToken(result.user);

  res.cookie(REFRESH_COOKIE, result.refreshToken, COOKIE_OPTIONS);
  res.json({ accessToken });
}

export async function logout(req: Request, res: Response) {
  const token = req.cookies?.[REFRESH_COOKIE];
  if (token) {
    await revokeSession(token);
  }

  res.clearCookie(REFRESH_COOKIE, { path: '/api/v1/auth' });
  res.json({ message: 'Logged out successfully' });
}

export function me(req: Request, res: Response) {
  res.json({ user: req.user });
}

export function failure(_req: Request, res: Response) {
  res.status(401).json({ error: 'Google authentication failed' });
}
