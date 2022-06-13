import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IBook, IBookCreate, IBookFilter, IBookUpdate } from '.';
import { MutationType } from '../../shared/enums/mutation-type.enum';
import { ISubscription } from '../../shared/interfaces/subscription.interface';
import { Author } from '../author/author.gql.model';
import { User } from '../user/user.gql.model';
import { IBookReview } from './reviews/book-review.interface';
import { BookReview } from './reviews/book.review.gql.model';

@ObjectType()
export class Book implements IBook {
  @Field(() => ID)
  _id: string;
  @Field()
  title: string;
  @Field()
  publishYear: number;
  @Field()
  authorId: string;
  @Field(() => Author)
  author: Author;
  @Field(() => [BookReview], { nullable: true })
  reviews: IBookReview[];
  @Field({ nullable: true })
  active: boolean;
  @Field({ nullable: true })
  createdAt: Date;
  @Field({ nullable: true })
  createdById: string;
  @Field(() => User, { nullable: true })
  createdBy: User;
  @Field({ nullable: true })
  updatedAt?: Date;
  @Field({ nullable: true })
  updatedById?: string;
  @Field(() => User, { nullable: true })
  updatedBy: User;
}

@InputType()
export class BookFilter implements IBookFilter {
  @Field(() => ID, { nullable: true })
  _id?: string;
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  publishYear: number;
  @Field({ nullable: true })
  authorId: string;
  @Field({ nullable: true })
  active: boolean;
}

@InputType()
export class BookCreate implements IBookCreate {
  @Field()
  title: string;
  @Field(() => Int)
  publishYear: number;
  @Field()
  authorId: string;
  @Field({ nullable: true })
  active: boolean;
}

@InputType()
export class BookUpdate implements IBookUpdate {
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  publishYear: number;
  @Field({ nullable: true })
  authorId: string;
  @Field({ nullable: true })
  active: boolean;
}

@ObjectType()
export class BookSubscription implements ISubscription<Book> {
  @Field()
  data: Book;
  @Field()
  mutationType: MutationType;
}
