import { Model } from 'mongoose';
import { IOrganization } from './organization.model';
import commonRepository from 'modules/common/common.repository';

export default function organizationRepository(model: Model<IOrganization>) {
  return {
    ...commonRepository(model),
  };
}
