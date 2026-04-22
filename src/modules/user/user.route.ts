import { Router } from 'express';
import { requireAuth } from '@shared/middleware/auth.middleware';
import { getCurrentUser } from '@modules/user/user.controller';

const userRouter = Router();

userRouter.get('/me', requireAuth, getCurrentUser);

export default userRouter;