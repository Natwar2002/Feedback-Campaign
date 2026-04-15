import { Model } from "mongoose";
import commonRepository from "modules/common/common.repository";
import { IFeedbackAnswer } from "./feedback-answer.model";

export default function feedbackAnswerRepository(model: Model<IFeedbackAnswer>) {
    return {
        ...commonRepository(model),
    }
}