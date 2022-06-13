import { IBaseFields } from '../../shared/interfaces';
import { IBook } from '../book';

interface IAuthorBase {
  name: string;
  lastname: string;
}

export interface IAuthorSchema extends IAuthorBase, IBaseFields {}

export interface IAuthor extends IAuthorSchema {
  _id: string;
  books: IBook[];
}

export interface IAuthorFilter extends Partial<IAuthorBase> {
  _id?: string;
  active?: boolean;
}

export type IAuthorCreate = IAuthorBase;

export interface IAuthorUpdate extends Partial<IAuthorBase> {
  active?: boolean;
}
