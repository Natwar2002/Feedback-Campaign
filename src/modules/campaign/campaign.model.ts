import mongoose from "mongoose";
import { Document, Model, Schema } from "mongoose";

export interface ICampaign extends Document {
    title: string;
    description?: string;
    createdBy: mongoose.Types.ObjectId;
    role: "DRAFT" | "ACTIVE" | "CLOSED";
    organizationId: mongoose.Types.ObjectId;
    workspaceId: mongoose.Types.ObjectId;
}

const campaignSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    role: {
        type: String,
        enum: ["DRAFT", "ACTIVE", "CLOSED"],
        default: "DRAFT",
    },
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    workspaceId: {
        type: Schema.Types.ObjectId,
        ref: "Workspace",
        required: true,
    }
},
{
    timestamps: true
})

const Campaign: Model<ICampaign> = mongoose.models.Campaign || mongoose.model<ICampaign>("Campaign", campaignSchema)
export default Campaign;