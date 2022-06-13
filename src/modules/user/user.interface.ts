import { IBaseFields } from '../../shared/interfaces/base-fields.interfaces';

interface IUserBase {
  username: string;
  password: string;
}

export interface IUserSchema extends IUserBase, IBaseFields {}

export interface IUser extends IUserSchema {
  _id: string;
  createdBy: IUser;
  updatedBy?: IUser;
}

export type IUserFilter = Partial<IUserBase>;

export type IUserCreate = IUserBase;

export interface IUserUpdate {
  username: string;
}
