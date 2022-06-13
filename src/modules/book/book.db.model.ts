import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  ENTITY_NAME_AUTHOR,
  ENTITY_NAME_BOOK,
  ENTITY_NAME_USER,
} from '../../shared';
import { IBookSchema } from './book.interface';
import { BookReview, BookReviewSchema } from './reviews/book-review.db.model';

@Schema({
  collection: ENTITY_NAME_BOOK,
})
export class Book implements IBookSchema {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  publishYear: number;
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: ENTITY_NAME_AUTHOR,
    required: true,
  })
  authorId: string;
  @Prop({
    type: () => [BookReviewSchema],
    _id: true,
  })
  reviews: BookReview[];
  @Prop({ required: true, default: true })
  active: boolean;
  @Prop({ required: true, default: Date.now })
  createdAt: Date;
  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: ENTITY_NAME_USER,
  })
  createdById: string;
  @Prop({ required: false })
  updatedAt: Date;
  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: ENTITY_NAME_USER,
  })
  updatedById: string;
}

export type BookDocument = Book & Document;
export const BookSchema = SchemaFactory.createForClass(Book);
