import { IUser } from '../../user';

interface IBookReviewBase {
  review: string;
}

export interface IBookReviewSchema extends IBookReviewBase {
  createdAt: Date;
  createdById: string;
  updatedAt?: Date;
  updatedById?: string;
}

export interface IBookReview extends IBookReviewSchema {
  _id: string;
  createdBy: IUser;
  updatedBy?: IUser;
}

export type IBookReviewCreate = IBookReviewBase;

export interface IBookReviewUpdate {
  review: string;
}
