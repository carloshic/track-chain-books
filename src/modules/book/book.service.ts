import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { PubSub } from 'graphql-subscriptions';
import { Model, Types } from 'mongoose';
import { ENTITY_NAME_BOOK } from '../../shared';
import { MutationType } from '../../shared/enums/mutation-type.enum';
import { ISubscription } from '../../shared/interfaces/subscription.interface';
import { Book, BookDocument } from './book.db.model';
import { IBookCreate, IBookFilter, IBookUpdate } from './book.interface';
import { IBookReviewCreate } from './reviews/book-review.interface';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly Book: Model<BookDocument>,
    @Inject('PUB_SUB') private pubSub: PubSub,
    @Inject(CONTEXT) private readonly context,
  ) {}

  find(filter: IBookFilter) {
    return this.Book.find(filter);
  }

  findOne(filter: IBookFilter) {
    return this.Book.findOne(filter);
  }

  findOneById(id: string) {
    return this.Book.findById(id);
  }

  async create(input: IBookCreate) {
    const data = await this.Book.create({
      ...input,
      createdById: this.context.user._id,
    });

    return this.publish({
      data,
      mutationType: MutationType.CREATED,
    });
  }

  async update(id: string, input: IBookUpdate) {
    const data = await this.Book.findByIdAndUpdate(
      id,
      {
        $set: {
          ...input,
          updatedById: this.context.user._id,
          updatedAt: new Date(),
        },
      },
      {
        new: true,
      },
    );

    if (!data) {
      throw new NotFoundException(
        'No se encontró el libro con el id especificado',
      );
    }

    return this.publish({
      data,
      mutationType: MutationType.UPDATED,
    });
  }

  async delete(id: string) {
    const data = await this.Book.findByIdAndDelete(id);

    if (!data) {
      throw new NotFoundException(
        'No se encontró el libro con el id especificado',
      );
    }

    return this.publish({
      data,
      mutationType: MutationType.DELETED,
    });
  }

  // REVIEWS
  async createReview(id: string, input: IBookReviewCreate) {
    const exists = await this.Book.findById(id);

    if (!exists) {
      throw new NotFoundException(
        'No se encontró el libro con el id especificado',
      );
    }

    const data = await this.Book.findByIdAndUpdate(
      id,
      {
        $push: {
          reviews: {
            _id: new Types.ObjectId(),
            ...input,
            createdAt: new Date(),
            createdById: this.context.user._id,
          },
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

  private publish(subscription: ISubscription<BookDocument>) {
    this.pubSub.publish(ENTITY_NAME_BOOK, {
      [ENTITY_NAME_BOOK]: subscription,
    });
    return subscription.data;
  }
}
