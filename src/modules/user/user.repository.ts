import commonRepository from '@modules/common/common.repository';
import { Model } from 'mongoose';
import { IUser } from './user.model';

export default function userRepository(model: Model<IUser>) {
  return {
    ...commonRepository(model),
    findByEmail: async (email: string) => {
      return await model.findOne({ email });
    },
    findAllAdmins: async () => {
      return await model.find({
        platformRole: 'PlatformAdmin',
      });
    },
    assignToAdmin: async (userId: string, assignedBy: string) => {
      return await model.findByIdAndUpdate(
        userId,
        {
          platformRole: 'PlatformAdmin',
          adminAssignedAt: new Date(),
          adminAssignedBy: assignedBy,
        },
        { new: true },
      );
    },
    removeAdminRole: async (userId: string) => {
      return await model.findByIdAndUpdate(
        userId,
        {
          platformRole: 'User',
          adminAssignedAt: undefined,
          adminAssignedBy: undefined,
        },
        { new: true },
      );
    },
  };
}
