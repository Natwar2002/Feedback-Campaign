import { Model } from "mongoose";
import commonRepository from "modules/common/common.repository";
import { IFeedbackAnswer } from "./feedback-answer.model";

export default function organizationRepository(model: Model<IFeedbackAnswer>) {
    return {
        ...commonRepository(model),
    }
}