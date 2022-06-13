import { PubSub } from 'graphql-subscriptions';

export const PUBSUB_PROVIDER = {
  provide: 'PUB_SUB',
  useValue: new PubSub(),
};
