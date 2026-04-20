import { Request, Response } from 'express';
import { Webhook } from 'svix';
import User from '@modules/user/user.model';

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

export const clerkWebhookHandler = async (req: Request, res: Response) => {
  if (!WEBHOOK_SECRET) {
    return res.status(500).json({ error: 'Missing CLERK_WEBHOOK_SECRET' });
  }

  const svixId = req.headers['svix-id'] as string;
  const svixTimestamp = req.headers['svix-timestamp'] as string;
  const svixSignature = req.headers['svix-signature'] as string;

  if (!svixId || !svixTimestamp || !svixSignature) {
    return res.status(400).json({ error: 'Missing svix headers' });
  }

  let event: any;

  try {
    const wh = new Webhook(WEBHOOK_SECRET);
    const rawBody =
      typeof req.body === 'string'
        ? req.body
        : Buffer.isBuffer(req.body)
          ? req.body.toString('utf-8')
          : JSON.stringify(req.body);

    event = wh.verify(rawBody, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return res.status(400).json({ error: 'Invalid webhook signature' });
  }

  const eventType = event.type;
  const data = event.data;

  console.log(`[Webhook] event: ${eventType}`);
  console.log(`[Webhook] data:`, JSON.stringify(data, null, 2));

  try {
    switch (eventType) {
      case 'user.created': {
        const primaryEmail = extractPrimaryEmail(data);

        if (!primaryEmail) {
          console.error('[Webhook] user.created — no primary email found:', data.id);
          // Return 200 so Clerk doesn't keep retrying an unresolvable event
          return res.status(200).json({ received: true, warning: 'No email found' });
        }

        // Prevents duplicate key error if webhook fires twice
        await User.findOneAndUpdate(
          { externalUserId: data.id },
          {
            $setOnInsert: {
              externalUserId: data.id,
              platformRole: 'User',
              status: 'active',
              plan: 'free',
              isOnboarded: false,
            },
            $set: {
              name: buildName(data),
              email: primaryEmail,
              avatar: data.image_url ?? undefined,
              lastLoginAt: new Date(),
            },
          },
          { upsert: true, new: true },
        );

        console.log(`[Webhook] User created: ${primaryEmail}`);
        break;
      }

      case 'user.updated': {
        const primaryEmail = extractPrimaryEmail(data);

        await User.findOneAndUpdate(
          { externalUserId: data.id },
          {
            $set: {
              name: buildName(data),
              ...(primaryEmail && { email: primaryEmail }),
              avatar: data.image_url ?? undefined,
            },
          },
          { new: true },
        );

        console.log(`[Webhook] User updated: ${data.id}`);
        break;
      }

      case 'user.deleted': {
        await User.findOneAndDelete({ externalUserId: data.id });
        console.log(`[Webhook] User deleted: ${data.id}`);
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event: ${eventType}`);
    }

    return res.status(200).json({ received: true });
  } catch (err: any) {
    console.error(`[Webhook] Error on event [${eventType}]:`, {
      message: err.message,
      code: err.code,
      stack: err.stack,
    });

    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
      code: err.code,
    });
  }
};

/**
 * Extracts primary email — handles both standard and OAuth signups
 */
const extractPrimaryEmail = (data: any): string | undefined => {
  // Method 1 — standard email signup
  const byId = data.email_addresses?.find(
    (e: any) => e.id === data.primary_email_address_id,
  )?.email_address;

  if (byId) return byId;

  // Method 2 — fallback to first verified email (OAuth signups)
  const firstVerified = data.email_addresses?.find(
    (e: any) => e.verification?.status === 'verified',
  )?.email_address;

  if (firstVerified) return firstVerified;

  // Method 3 — fallback to any email
  return data.email_addresses?.[0]?.email_address;
};

/**
 * Builds display name — handles missing first/last name (OAuth)
 */
const buildName = (data: any): string => {
  const full = `${data.first_name ?? ''} ${data.last_name ?? ''}`.trim();
  if (full) return full;
  if (data.username) return data.username;
  return 'Unknown';
};
