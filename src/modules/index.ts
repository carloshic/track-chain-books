import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { UserModule } from './user/user.module';

export const MODULES = [
  AuthorModule,
  BookModule,
  UserModule,
  AuthModule,
  SubscriptionModule,
];
