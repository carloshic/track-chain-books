import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PUBSUB_PROVIDER } from '../../shared/providers/pubsub.provider';
import { User, UserSchema } from './user.db.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

const PROVIDERS = [UserService, UserResolver];

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [PUBSUB_PROVIDER, ...PROVIDERS],
  exports: [...PROVIDERS],
})
export class UserModule {}
