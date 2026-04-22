import feedbackRouter from '@modules/feedback/feedback.route';
import platformRouter from '@modules/platform/platform.route';
import userRouter from '@modules/user/user.route';
import { Router } from 'express';

const v1Router = Router();

v1Router.use('/feedbacks', feedbackRouter);
v1Router.use('/platform', platformRouter);
v1Router.use('/users', userRouter);

export default v1Router;
// /api/v1/users/me