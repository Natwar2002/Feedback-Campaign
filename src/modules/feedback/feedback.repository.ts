import { Model } from "mongoose";
import commonRepository from "modules/common/common.repository";
import { IFeedback } from "./feedback.model";

export default function organizationRepository(model: Model<IFeedback>) {
    return {
        ...commonRepository(model),
    }
}