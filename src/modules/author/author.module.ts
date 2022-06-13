import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PUBSUB_PROVIDER } from '../../shared';
import { BookModule } from '../book';
import { UserModule } from '../user/user.module';
import { Author, AuthorSchema } from './author.db.model';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';

const PROVIDERS = [AuthorService, AuthorResolver];

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Author.name,
        schema: AuthorSchema,
      },
    ]),
    BookModule,
    UserModule,
  ],
  providers: [PUBSUB_PROVIDER, ...PROVIDERS],
  exports: [...PROVIDERS],
})
export class AuthorModule {}
