import {
  Args,
  ID,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { Admin, Authorize } from '../../shared';
import { AuthorService } from '../author';
import { Author } from '../author/author.gql.model';
import { UserService } from '../user';
import { User } from '../user/user.gql.model';
import { Book, BookCreate, BookFilter, BookUpdate } from './book.gql.model';
import { BookService } from './book.service';
import { BookReview, BookReviewCreate } from './reviews/book.review.gql.model';

@Authorize()
@Resolver(() => Book)
export class BookResolver {
  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private userService: UserService,
  ) {}

  @Admin()
  @Query(() => [Book])
  books(
    @Args({
      type: () => BookFilter,
      nullable: true,
      name: 'filter',
    })
    filter: BookFilter,
  ) {
    return this.bookService.find(filter);
  }

  @Query(() => Book)
  book(
    @Args({
      type: () => BookFilter,
      nullable: false,
      name: 'filter',
    })
    filter: BookFilter,
  ) {
    return this.bookService.findOne(filter);
  }

  @Mutation(() => Book)
  createBook(@Args('input') input: BookCreate) {
    return this.bookService.create(input);
  }

  @Mutation(() => Book)
  updateBook(
    @Args({ nullable: false, name: 'id' }) id: string,
    @Args({ nullable: false, name: 'input' }) input: BookUpdate,
  ) {
    return this.bookService.update(id, input);
  }

  @Mutation(() => Book)
  deleteBook(@Args('id', { nullable: false, type: () => ID }) id: string) {
    return this.bookService.delete(id);
  }

  // REVIEWS
  @Mutation(() => Book)
  createBookReview(
    @Args('id', { type: () => ID }) id: string,
    @Args('input', { type: () => BookReviewCreate })
    input: BookReviewCreate,
  ) {
    return this.bookService.createReview(id, input);
  }

  @ResolveField('author', () => Author)
  author(@Root() root: Book) {
    return this.authorService.findOneById(root.authorId);
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
