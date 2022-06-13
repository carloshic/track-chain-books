import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { ENTITY_NAME_USER } from '../../../shared';
import { IBookReviewSchema } from './book-review.interface';

@Schema()
export class BookReview implements IBookReviewSchema {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: ENTITY_NAME_USER,
    required: true,
  })
  userId: string;
  @Prop({ required: true })
  review: string;
  @Prop({ required: true, default: Date.now })
  createdAt: Date;
  @Prop({ required: true })
  createdById: string;
  @Prop()
  updatedAt: Date;
  @Prop()
  updatedById: string;
}

export const BookReviewSchema = SchemaFactory.createForClass(BookReview);
