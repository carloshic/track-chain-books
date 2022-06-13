import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PUBSUB_PROVIDER } from '../../shared';
import { AuthorModule } from '../author';
import { UserModule } from '../user/user.module';
import { Book, BookSchema } from './book.db.model';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';
import { BookReviewResolver } from './reviews/book-review.resolver';

const PROVIDERS = [BookService, BookResolver, BookReviewResolver];

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
    forwardRef(() => AuthorModule),
    UserModule,
  ],
  providers: [PUBSUB_PROVIDER, ...PROVIDERS],
  exports: [...PROVIDERS],
})
export class BookModule {}
