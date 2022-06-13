import { Inject } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Authorize } from '../../shared/decorators';
import { BookService } from '../book';
import { Book } from '../book/book.gql.model';
import { UserService } from '../user';
import { User } from '../user/user.gql.model';
import { AuthorService } from './';
import {
  Author,
  AuthorCreate,
  AuthorFilter,
  AuthorUpdate,
} from './author.gql.model';

@Authorize()
@Resolver(() => Author)
export class AuthorResolver {
  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private userService: UserService,
  ) {}

  @Query(() => [Author])
  authors(
    @Args({
      type: () => AuthorFilter,
      nullable: true,
      name: 'filter',
    })
    filter: AuthorFilter,
  ) {
    return this.authorService.find(filter);
  }

  @Query(() => Author, { nullable: true })
  author(
    @Args('filter', {
      type: () => AuthorFilter,
      nullable: false,
    })
    filter: AuthorFilter,
  ) {
    return filter._id
      ? this.authorService.findOneById(filter._id)
      : this.authorService.findOne(filter);
  }

  @Mutation(() => Author)
  createAuthor(@Args('input') input: AuthorCreate) {
    return this.authorService.create(input);
  }

  @Mutation(() => Author)
  updateAuthor(
    @Args('id', { nullable: false }) id: string,
    @Args('input', { nullable: false }) input: AuthorUpdate,
  ) {
    return this.authorService.update(id, input);
  }

  @Mutation(() => Author)
  deleteAuthor(@Args('id', { nullable: false }) id: string) {
    return this.authorService.delete(id);
  }

  @ResolveField('books', () => [Book])
  books(@Root() root: Author) {
    return this.bookService.find({
      authorId: root._id,
    });
  }

  @ResolveField(() => User, {
    name: 'createdBy',
  })
  createdBy(@Root() root: User) {
    return this.userService.findOneById(root.createdById);
  }

  @ResolveField(() => User, {
    name: 'updatedBy',
  })
  updatedBy(@Root() root: User) {
    return this.userService.findOneById(root.updatedById);
  }
}
