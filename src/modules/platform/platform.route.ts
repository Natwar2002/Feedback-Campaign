import { Router } from 'express';
import { requireAuth } from '@shared/middleware/auth.middleware';
import {
  assignPlatformAdmin,
  getAllAdmins,
  getAdminById,
  removeAdminRole,
} from './platform.controller';

const platformRouter = Router();

platformRouter.post('/admins', requireAuth, assignPlatformAdmin);

platformRouter.get('/admins', requireAuth, getAllAdmins);

platformRouter.get('/admins/:userId', requireAuth, getAdminById);

platformRouter.delete('/admins/:userId', requireAuth, removeAdminRole);

export default platformRouter;



