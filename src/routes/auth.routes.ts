import { Router } from 'express';
import {
  googleLogin,
  googleCallback,
  refresh,
  logout,
  me,
  failure,
} from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/google', googleLogin);
router.get('/google/callback', ...googleCallback);
router.post('/refresh', refresh);
router.get('/failure', failure);

router.post('/logout', authenticate, logout);
router.get('/me', authenticate, me);

export { router as authRoutes };
