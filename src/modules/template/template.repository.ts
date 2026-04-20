import commonRepository from 'modules/common/common.repository';
import { ITemplate } from './template.model';
import { Model } from 'mongoose';

export default function templateRepository(model: Model<ITemplate>) {
  return {
    ...commonRepository(model),
  };
}
