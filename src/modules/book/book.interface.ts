import { IAuthor } from '../author/author.interface';
import { IBookReview } from './reviews/book-review.interface';

export interface IBookSchema {
  title: string;
  authorId: string;
  publishYear: number;
}

export interface IBook extends IBookSchema {
  _id: string;
  author: IAuthor;
  reviews: IBookReview[];
}

export interface IBookFilter extends Partial<IBookSchema> {
  _id?: string;
}

export type IBookCreate = IBookSchema;
export type IBookUpdate = Partial<IBookSchema>;
