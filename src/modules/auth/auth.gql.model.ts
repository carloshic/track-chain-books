import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ILogin, ILoginSuccess } from '../../modules/auth';

@ObjectType()
export class LoginSuccess implements ILoginSuccess {
  @Field()
  accessToken: string;
  @Field()
  expiresIn: number;
}

@InputType()
export class Login implements ILogin {
  @Field({ nullable: false })
  password: string;
  @Field({ nullable: false })
  username: string;
}
