import {
  Inject,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PubSub } from 'graphql-subscriptions';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.db.model';
import {
  IUserCreate,
  IUserFilter,
  IUserSchema,
  IUserUpdate,
} from './user.interface';
import * as bcrypt from 'bcryptjs';
import { CONTEXT } from '@nestjs/graphql';
import { ENTITY_NAME_USER } from '../../shared';
import { ISubscription } from '../../shared/interfaces/subscription.interface';
import { MutationType } from '../../shared/enums/mutation-type.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly User: Model<UserDocument>,
    @Inject('PUB_SUB') private pubSub: PubSub,
    @Inject(CONTEXT) private readonly context,
  ) {}

  async find(filter: IUserFilter) {
    return this.User.find(filter);
  }

  async findOne(filter: IUserFilter) {
    return await this.User.findOne(filter);
  }

  findOneById(id: string) {
    return this.User.findById(id);
  }

  async create(user: IUserCreate) {
    const exist = await this.User.findOne({ username: user.username });

    if (exist) {
      throw new NotAcceptableException(
        `El usuario ${user.username} ya se encuentra registrado`,
      );
    }

    const record = {
      ...user,
      password: bcrypt.hashSync(user.password),
      createdById: this.context.user?._id,
    };

    const data = await this.User.create(record);

    return this.publish({
      data,
      mutationType: MutationType.CREATED,
    });
  }

  async update(id: string, input: IUserUpdate) {
    if (input.username === this.context.user.username) {
      throw new NotAcceptableException(
        `Debes especificar un usuario diferente a ${input.username}`,
      );
    }

    const exist = await this.User.findOne({ username: input.username });

    if (exist) {
      throw new NotAcceptableException(
        `El usuario ${input.username} ya se encuentra registrado`,
      );
    }

    const data = await this.User.findByIdAndUpdate(
      id,
      {
        $set: {
          ...input,
          updatedById: this.context.user?._id,
          updatedAt: new Date(),
        },
      },
      {
        new: true,
      },
    );

    if (!data) {
      throw new NotFoundException(
        `No se encontró el usuario con el id especificado`,
      );
    }

    return this.publish({
      data,
      mutationType: MutationType.UPDATED,
    });
  }

  async delete(id: string) {
    const data = await this.User.findByIdAndDelete(id);

    if (!data) {
      throw new NotFoundException(
        `No se encontró el usuario con el id especificado`,
      );
    }

    return this.publish({
      data,
      mutationType: MutationType.DELETED,
    });
  }

  private publish(subscription: ISubscription<UserDocument>) {
    this.pubSub.publish(ENTITY_NAME_USER, {
      [ENTITY_NAME_USER]: subscription,
    });
    return subscription.data;
  }
}
