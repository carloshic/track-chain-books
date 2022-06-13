import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
  IAuthor,
  IAuthorCreate,
  IAuthorFilter,
  IAuthorUpdate,
} from '../../modules/author';
import { MutationType } from '../../shared/enums/mutation-type.enum';
import { ISubscription } from '../../shared/interfaces/subscription.interface';
import { Book } from '../book/book.gql.model';
import { User } from '../user/user.gql.model';

@ObjectType()
export class Author implements IAuthor {
  @Field(() => ID)
  _id: string;
  @Field(() => [Book])
  books: Book[];
  @Field()
  name: string;
  @Field()
  lastname: string;
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
export class AuthorFilter implements IAuthorFilter {
  @Field(() => ID, { nullable: true })
  _id?: string;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  lastname?: string;
  @Field({ nullable: true })
  active?: boolean;
}

@InputType()
export class AuthorCreate implements IAuthorCreate {
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  lastname: string;
}

@InputType()
export class AuthorUpdate implements IAuthorUpdate {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  lastname?: string;
}

@ObjectType()
export class AuthorSubscription implements ISubscription<Author> {
  @Field()
  data: Author;
  @Field()
  mutationType: MutationType;
}
