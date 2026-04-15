import { Model } from "mongoose";
import commonRepository from "modules/common/common.repository";
import { ICampaign } from "./campaign.model";

export default function organizationRepository(model: Model<ICampaign>) {
    return {
        ...commonRepository(model),
    }
}