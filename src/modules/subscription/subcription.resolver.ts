import { Inject } from '@nestjs/common';
import { Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import {
  ENTITY_NAME_AUTHOR,
  ENTITY_NAME_BOOK,
  ENTITY_NAME_USER,
} from '../../shared';
import { AuthorSubscription } from '../author/author.gql.model';
import { BookSubscription } from '../book/book.gql.model';
import { UserSubscription } from '../user/user.gql.model';

export class SubscriptionResolver {
  constructor(@Inject('PUB_SUB') private pubSub: PubSub) {}

  @Subscription(() => BookSubscription, {
    name: ENTITY_NAME_BOOK,
  })
  bookSubscription() {
    return this.pubSub.asyncIterator(ENTITY_NAME_BOOK);
  }

  @Subscription(() => AuthorSubscription, {
    name: ENTITY_NAME_AUTHOR,
  })
  authorSubscription() {
    return this.pubSub.asyncIterator(ENTITY_NAME_AUTHOR);
  }

  @Subscription(() => UserSubscription, {
    name: ENTITY_NAME_USER,
  })
  userSubscription() {
    return this.pubSub.asyncIterator(ENTITY_NAME_USER);
  }
}
