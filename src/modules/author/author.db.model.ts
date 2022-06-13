import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Document } from 'mongoose';
import { ENTITY_NAME_AUTHOR, ENTITY_NAME_USER } from '../../shared';
import { IAuthorSchema } from './author.interface';

@Schema({ collection: ENTITY_NAME_AUTHOR })
export class Author implements IAuthorSchema {
  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: true,
  })
  lastname: string;
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

export type AuthorDocument = Author & Document;
export const AuthorSchema = SchemaFactory.createForClass(Author);
