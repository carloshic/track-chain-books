import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ENTITY_NAME_USER } from '../../shared';
import { IUserSchema } from './user.interface';

@Schema({ collection: ENTITY_NAME_USER })
export class User implements IUserSchema {
  @Prop({ required: true, minlength: 5, unique: true })
  username: string;
  @Prop({ required: true })
  password: string;
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

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
