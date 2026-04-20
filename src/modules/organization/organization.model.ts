import mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export interface IOrganization extends Document {
  name: string;
  description?: string;
  createdBy: mongoose.Types.ObjectId;
  members: {
    member: mongoose.Types.ObjectId;
    role: 'ORG_OWNER' | 'ORG_ADMIN' | 'MEMBER';
  }[];
}

const organizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        member: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        role: {
          type: String,
          enum: ['ORG_OWNER', 'ORG_ADMIN', 'MEMBER'],
          default: 'MEMBER',
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Organization: Model<IOrganization> =
  mongoose.models.Organization || mongoose.model<IOrganization>('Organization', organizationSchema);
export default Organization;
