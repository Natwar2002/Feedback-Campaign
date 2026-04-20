import express from 'express';
import { clerkWebhookHandler } from '@infra/clerk/webhooks/clerk.webhook';

const router = express.Router();

router.post('/clerk', express.raw({ type: 'application/json' }), clerkWebhookHandler);

export default router;
