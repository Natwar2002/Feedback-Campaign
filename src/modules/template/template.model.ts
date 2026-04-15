import mongoose from "mongoose";
import { Document, Model, Schema } from "mongoose";

export interface ITemplate extends Document {
    organizationId: mongoose.Types.ObjectId;
    workspaceId: mongoose.Types.ObjectId;
    campaignId: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    isPublished: boolean;
    createdBy: mongoose.Types.ObjectId;
    fields: {
        fieldId: mongoose.Types.ObjectId;
        fieldType: "TEXT" | "RATING" | "MCQ" | "IMAGE" | "VIDEO" | "AUDIO";
        label: string;
        placeholder?: string;
        required: boolean;
        helperText?: string;
        order: number;
        mediaConfig?: {
            maxSize?: number;
            allowedFormats?: string[];
            maxDurationSec?: number;
        };
        mcqOptions?: {
            label: string;
            value: string;
        }[];
    }[];
}

const templateSchema = new Schema({
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    workspaceId: {
        type: Schema.Types.ObjectId,
        ref: "Workspace",
        required: true,
    },
    campaignId: {
        type: Schema.Types.ObjectId,
        ref: "Campaign",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    fields: [{
        fieldId: {
            type: Schema.Types.ObjectId,
            ref: "Field",
            required: true
        },
        fieldType: {
            enum: ["TEXT", "RATING", "MCQ", "IMAGE", "VIDEO", "AUDIO"],
        },
        label: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
        },
        required: {
            type: Boolean,
            default: false,
        },
        helperText: {
            type: String,
        },
        order: {
            type: Number,
            default: 0,
        },
        mediaConfig: {
            maxSize: {
                type: Number,
            },
            allowedFormats: {
                type: [String],
            },
            maxDurationSec: {
                type: Number,
            }
        },
        mcqOptions: [{
            label: {
                type: String,
            },
            value: {
                type: String,
            },
            validate: {
                validator: function (value: string) {
                    if (this.fieldType === "MCQ") {
                        return value && value.length > 0;
                    }
                    return true;
                },
                message: "mcqOptions are required when fieldType is MCQ"
            }
        }],
    }]
}, {
    timestamps: true
})

const Template: Model<ITemplate> = mongoose.models.Template || mongoose.model<ITemplate>("Template", templateSchema);
export default Template;