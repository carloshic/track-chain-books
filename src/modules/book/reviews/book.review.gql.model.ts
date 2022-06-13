import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IUser } from '../../user';
import { User } from '../../user/user.gql.model';
import {
  IBookReview,
  IBookReviewCreate,
  IBookReviewUpdate,
} from './book-review.interface';

@ObjectType()
export class BookReview implements IBookReview {
  @Field(() => ID)
  _id: string;
  @Field()
  review: string;
  @Field({ nullable: true })
  createdAt: Date;
  @Field({ nullable: true })
  createdById: string;
  @Field(() => User, { nullable: true })
  createdBy: IUser;
  @Field({ nullable: true })
  updatedAt?: Date;
  @Field({ nullable: true })
  updatedById?: string;
  @Field(() => User, { nullable: true })
  updatedBy: IUser;
}

@InputType()
export class BookReviewCreate implements IBookReviewCreate {
  @Field()
  review: string;
}

@InputType()
export class BookReviewUpdate implements IBookReviewUpdate {
  @Field()
  review: string;
}
