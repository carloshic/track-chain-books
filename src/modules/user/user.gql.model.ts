import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { MutationType } from '../../shared/enums/mutation-type.enum';
import { ISubscription } from '../../shared/interfaces/subscription.interface';
import {
  IUser,
  IUserCreate,
  IUserFilter,
  IUserUpdate,
} from '../user/user.interface';

@ObjectType()
export class User implements Omit<IUser, 'password'> {
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field({ nullable: true })
  username: string;
  @Field({ nullable: true })
  active: boolean;
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
export class UserFilter implements IUserFilter {
  @Field(() => ID, { nullable: true })
  _id?: string;
  @Field({ nullable: true })
  username?: string;
  @Field({ nullable: true })
  active?: boolean;
}

@InputType()
export class UserCreate implements IUserCreate {
  @Field({ nullable: false })
  username: string;
  @Field({ nullable: false })
  password: string;
  @Field({ nullable: true })
  active?: boolean;
}

@InputType()
export class UserUpdate implements IUserUpdate {
  @Field()
  username: string;
  @Field({ nullable: true })
  active?: boolean;
}

@ObjectType()
export class UserSubscription implements ISubscription<User> {
  @Field()
  data: User;
  @Field()
  mutationType: MutationType;
}
