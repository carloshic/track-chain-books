import { Module } from '@nestjs/common';
import { PUBSUB_PROVIDER } from '../../shared';
import { SubscriptionResolver } from './subcription.resolver';

@Module({
  providers: [PUBSUB_PROVIDER, SubscriptionResolver],
})
export class SubscriptionModule {}
