import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphqlModule } from './graphql/graphql.module';
import { MongoConnectionModule } from './mongo-connection/mongo-connection.module';

@Module({
  imports: [ConfigModule.forRoot(), GraphqlModule, MongoConnectionModule],
})
export class CoreModule {}
