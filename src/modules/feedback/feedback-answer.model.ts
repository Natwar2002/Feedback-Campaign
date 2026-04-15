import mongoose from "mongoose";
import { Document, Model, Schema } from "mongoose";

export interface IFeedbackAnswer extends Document {
    feedbackId: mongoose.Types.ObjectId;
    fieldId: mongoose.Types.ObjectId;
    type: "TEXT" | "RATING" | "MCQ" | "IMAGE" | "VIDEO" | "AUDIO";
    value: {
        text?: string;
        rating?: number;
        selectedOptions?: string[];
        media?: {
            url: string;
            type: "IMAGE" | "VIDEO" | "AUDIO";
            sizeMB: number;
            durationSec: number;
        }
    };
}

const feedbackAnswerSchema = new Schema({
    feedbackId: {
        type: Schema.Types.ObjectId,
        ref: "Feedback",
        required: true,
        index: true,
    },
    fieldId: {
        type: Schema.Types.ObjectId,
        ref: "Field",
        required: true,
    },
    type: {
        type: String,
        enum: ["TEXT", "RATING", "MCQ", "IMAGE", "VIDEO", "AUDIO"],
        required: true,
    },
    value: {
        text: {
            type: String,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        selectedOptions: [{
            type: String,
        }],
        media: {
            url: {
                type: String,
            },
            type: {
                type: String,
                enum: ["IMAGE", "VIDEO", "AUDIO"],
            },
            sizeMB: {
                type: Number,
            },
            durationSec: {
                type: Number,
            }
        }
    },
}, {
    timestamps: true
});

const FeedbackAnswer: Model<IFeedbackAnswer> = mongoose.models.FeedbackAnswer || mongoose.model<IFeedbackAnswer>("FeedbackAnswer", feedbackAnswerSchema);
export default FeedbackAnswer;
