import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { PubSub } from 'graphql-subscriptions';
import { Model } from 'mongoose';
import { ENTITY_NAME_AUTHOR } from '../../shared';
import { MutationType } from '../../shared/enums/mutation-type.enum';
import { ISubscription } from '../../shared/interfaces/subscription.interface';
import { Author, AuthorDocument } from './author.db.model';
import {
  IAuthorCreate,
  IAuthorFilter,
  IAuthorUpdate,
} from './author.interface';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private readonly Author: Model<AuthorDocument>,
    @Inject('PUB_SUB') private pubSub: PubSub,
    @Inject(CONTEXT) private readonly context,
  ) {}

  find(filter: IAuthorFilter) {
    return this.Author.find(filter);
  }

  findOne(filter: IAuthorFilter) {
    return this.Author.findOne(filter);
  }

  findOneById(id: string) {
    return this.Author.findById(id);
  }

  async create(input: IAuthorCreate) {
    const data = await this.Author.create({
      ...input,
      createdById: this.context.user._id,
    });

    return this.publish({
      data,
      mutationType: MutationType.CREATED,
    });
  }

  async update(id: string, author: IAuthorUpdate) {
    const exists = await this.Author.findById(id);

    if (!exists) {
      throw new NotFoundException(
        'No se encontró el author con el id especificado',
      );
    }

    const data = await this.Author.findByIdAndUpdate(
      id,
      {
        $set: {
          ...author,
          updatedById: this.context.user._id,
          updatedAt: new Date(),
        },
      },
      {
        new: true,
      },
    );

    return this.publish({
      data,
      mutationType: MutationType.UPDATED,
    });
  }

  async delete(id: string) {
    const data = await this.Author.findByIdAndDelete(id);

    if (!data) {
      throw new NotFoundException(
        'No se encontró el author con el id especificado',
      );
    }

    return this.publish({
      data,
      mutationType: MutationType.DELETED,
    });
  }

  private publish(subscription: ISubscription<AuthorDocument>) {
    this.pubSub.publish(ENTITY_NAME_AUTHOR, {
      [ENTITY_NAME_AUTHOR]: subscription,
    });
    return subscription.data;
  }
}
