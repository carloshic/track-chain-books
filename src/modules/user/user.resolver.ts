import {
  Args,
  ID,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { UserService } from '../../modules/user/user.service';
import { Authorize } from '../../shared/decorators/authorize.decorator';
import { User, UserCreate, UserFilter, UserUpdate } from './user.gql.model';

@Authorize()
@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query(() => [User])
  users(
    @Args({
      name: 'filter',
      nullable: true,
    })
    filter: UserFilter,
  ) {
    return this.userService.find(filter);
  }

  @Query(() => User, { nullable: true })
  user(
    @Args('filter')
    filter: UserFilter,
  ) {
    return filter._id
      ? this.userService.findOneById(filter._id)
      : this.userService.findOne(filter);
  }

  @Mutation(() => User)
  createUser(
    @Args('input')
    input: UserCreate,
  ) {
    return this.userService.create(input);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => ID })
    id: string,
    @Args('input')
    input: UserUpdate,
  ) {
    return this.userService.update(id, input);
  }

  @Mutation(() => User)
  deleteUser(
    @Args('id', { type: () => ID })
    id: string,
  ) {
    return this.userService.delete(id);
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
