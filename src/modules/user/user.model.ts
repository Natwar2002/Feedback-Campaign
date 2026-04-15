import mongoose from "mongoose";
import { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    avatar?: string;
    platformRole: "SuperAdmin" | "User";
    externalUserId: string;
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: false
    },
    platformRole: {
        enum: ["SuperAdmin", "User"],
        required: true,
        default: "User"
    },
    externalUserId: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;