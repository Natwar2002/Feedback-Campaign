import { Model } from 'mongoose';

export default function commonRepository<T>(model: Model<T>) {
  return {
    create: async (data: T) => {
      const document = new model(data);
      return await document.save();
    },
    findById: async (id: string) => {
      return await model.findById(id);
    },
    updateById: async (id: string, data: Partial<T>) => {
      return await model.findByIdAndUpdate(id, data, { new: true });
    },
    deleteById: async (id: string) => {
      return await model.findByIdAndDelete(id);
    },
  };
}
