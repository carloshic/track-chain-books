import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Login, LoginSuccess } from './auth.gql.model';

@Resolver(() => LoginSuccess)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginSuccess)
  login(@Args('input', { type: () => Login }) input: Login) {
    return this.authService.login(input);
  }
}
