import { Model } from "mongoose";
import commonRepository from "modules/common/common.repository";
import { IInvitation } from "./invitation.model";

export default function invitationRepository(model: Model<IInvitation>) {
    return {
        ...commonRepository(model),
    }
}