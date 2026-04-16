import mongoose from "mongoose";
import { Document, Model, Schema } from "mongoose";
export interface IWorkspace extends Document {
    name: string;
    description?: string;
    organization: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
}

const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})

const Workspace: Model<IWorkspace> = mongoose.model<IWorkspace>("Workspace", workspaceSchema)
export default Workspace;
