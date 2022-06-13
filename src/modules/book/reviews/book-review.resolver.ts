import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import { UserService } from '../../user';
import { User } from '../../user/user.gql.model';
import { BookReview } from './book.review.gql.model';

@Resolver(() => BookReview)
export class BookReviewResolver {
  constructor(private userService: UserService) {}
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
