import mongoose, { mongo } from "mongoose";
import { Document, Model, Schema } from "mongoose";

export interface IInvitation extends Document {
    organizationId: mongoose.Types.ObjectId;
    email: string;
    role: "ORG_ADMIN" | "MEMBER";
    status: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
    invitedBy: mongoose.Types.ObjectId;
    acceptedBy?: mongoose.Types.ObjectId;
    expiresAt: Date;
    acceptedAt?: Date;
    token: string;
}

const invitationSchema = new Schema({
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["ORG_ADMIN", "MEMBER"],
        default: "MEMBER",
    },
    status: {
        type: String,
        enum: ["PENDING", "ACCEPTED", "REJECTED", "EXPIRED"],
        default: "PENDING",
    },
    invitedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    acceptedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    acceptedAt: {
        type: Date,
    },
    token: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true
});

const Invitation: Model<IInvitation> = mongoose.models.Invitation || mongoose.model<IInvitation>("Invitation", invitationSchema);
export default Invitation;
