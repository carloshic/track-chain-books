import { Module } from '@nestjs/common';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { MODULES } from '../../modules';
import { MutationType } from '../../shared/enums/mutation-type.enum';
import getAccessToken from '../../shared/functions/get-access-token';
import { PUBSUB_PROVIDER } from '../../shared/providers/pubsub.provider';

registerEnumType(MutationType, {
  name: 'MutationType',
});

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      context: ({ req }) => ({
        user: getAccessToken(req),
      }),
    }),
    ...MODULES,
  ],
  providers: [PUBSUB_PROVIDER],
})
export class GraphqlModule {}
