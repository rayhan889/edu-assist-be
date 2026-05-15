import express, { Application, Router } from 'express';
import { router as userRoutes } from './routes/user.routes';
import { authRoutes } from './routes/auth.routes';
import passport from './auth/passport';
import cookieParser from 'cookie-parser';

const app: Application = express();

const apiV1 = Router();
apiV1.use('/users', userRoutes);
apiV1.use('/auth', authRoutes);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use('/api/v1', apiV1);

export default app;
