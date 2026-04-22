import { Request, Response } from 'express';
import User from '@modules/user/user.model';
import userRepository from '@modules/user/user.repository';

const userRepo = userRepository(User);

export const assignPlatformAdmin = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    if (req.dbUser?.platformRole !== 'PlatformAdmin') {
      return res.status(403).json({ error: 'Only PlatformAdmin can assign admin roles' });
    }

    const targetUser = await userRepo.findById(userId);

    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (targetUser.platformRole === 'PlatformAdmin') {
      return res.status(409).json({ error: 'User is already a platform admin' });
    }

    const updatedUser = await userRepo.assignToAdmin(userId, req.dbUser?._id.toString());

    res.status(200).json({
      message: 'Platform admin assigned successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error assigning platform admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    if (req.dbUser?.platformRole !== 'PlatformAdmin') {
      return res.status(403).json({ error: 'Only PlatformAdmin can view platform admins' });
    }

    const admins = await userRepo.findAllAdmins();

    res.status(200).json({
      message: 'Platform admins retrieved successfully',
      data: admins,
    });
  } catch (error) {
    console.error('Error retrieving platform admins:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAdminById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId || Array.isArray(userId)) {
      return res.status(400).json({ error: 'Invalid userId parameter' });
    }

    const admin = await userRepo.findById(userId);
    if (!admin || admin.platformRole !== 'PlatformAdmin') {
      return res.status(404).json({ error: 'Platform admin not found' });
    }

    res.status(200).json({
      message: 'Platform admin retrieved successfully',
      data: admin,
    });
  } catch (error) {
    console.error('Error retrieving platform admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeAdminRole = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId || Array.isArray(userId)) {
      return res.status(400).json({ error: 'Invalid userId parameter' });
    }

    if (req.dbUser?.platformRole !== 'PlatformAdmin') {
      return res.status(403).json({ error: 'Only PlatformAdmin can remove admin roles' });
    }

    const admin = await userRepo.findById(userId);
    if (!admin || admin.platformRole !== 'PlatformAdmin') {
      return res.status(404).json({ error: 'Platform admin not found' });
    }

    if (admin._id.toString() === req.dbUser?._id.toString()) {
      return res.status(400).json({ error: 'Cannot remove your own admin role' });
    }

    const updatedUser = await userRepo.removeAdminRole(userId);

    res.status(200).json({
      message: 'Platform admin role removed successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error removing platform admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
