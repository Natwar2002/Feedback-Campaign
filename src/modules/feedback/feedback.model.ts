import mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

export interface IFeedback extends Document {
  organizationId: mongoose.Types.ObjectId;
  workspaceId: mongoose.Types.ObjectId;
  campaignId: mongoose.Types.ObjectId;
  templateId: mongoose.Types.ObjectId;
  respondentEmail: {
    name: string;
    email: string;
  };
}

const feedbackSchema = new Schema(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
      required: true,
    },
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true,
    },
    templateId: {
      type: Schema.Types.ObjectId,
      ref: 'Template',
      required: true,
    },
    respondentEmail: {
      name: String,
      email: String,
    },
  },
  {
    timestamps: true,
  },
);

const Feedback: Model<IFeedback> =
  mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', feedbackSchema);
export default Feedback;
