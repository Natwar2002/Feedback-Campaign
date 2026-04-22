import mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  avatar?: string;
  platformRole: 'PlatformAdmin' | 'User';
  externalUserId: string;
  adminAssignedAt?: Date;
  adminAssignedBy?: string;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    platformRole: {
      type: String,
      enum: ['PlatformAdmin', 'User'],
      required: true,
      default: 'User',
    },
    externalUserId: {
      type: String,
      required: true,
    },
    adminAssignedAt: {
      type: Date,
      required: false,
    },
    adminAssignedBy: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
