import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { clerkMiddleware } from '@clerk/express';
import appRouter from '@routes/index';
import webhookRoutes from '@infra/clerk/webhooks/webhook.routes';

const app = express();

app.use('/webhooks', webhookRoutes);
app.use(clerkMiddleware());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*', credentials: true }));
app.use(helmet());
app.use(morgan('combined'));

// ── API Routes ────
app.use('/api', appRouter);

// ── 404 ─────
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
