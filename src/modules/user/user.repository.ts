import commonRepository from "modules/common/common.repository";
import { Model } from "mongoose";
import { IUser } from "./user.model";

export default function userRepository(model: Model<IUser>) {
    return {
        ...commonRepository(model),
        findByEmail: async (email: string) => {
            return await model.findOne({ email });
        }
    }
}