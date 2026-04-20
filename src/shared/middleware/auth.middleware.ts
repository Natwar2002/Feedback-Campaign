import { Request, Response, NextFunction } from 'express';
import { clerkClient, getAuth } from '@clerk/express';
import User, { IUser } from '@modules/user/user.model';

declare global {
  namespace Express {
    interface Request {
      dbUser?: IUser;
    }
  }
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const dbUser = await User.findOne({ externalUserId: userId });

  if (!dbUser) {
    return res.status(404).json({ error: 'User not found in database' });
  }

  req.dbUser = dbUser;
  next();
};
