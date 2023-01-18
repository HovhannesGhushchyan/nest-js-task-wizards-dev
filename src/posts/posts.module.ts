import { Module } from '@nestjs/common';
import { RedisCacheService } from '../shared/cache/redis-cache.service';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { PostsRepository } from './repository/posts.repository';
import { PostsService } from './posts.service';
import { LoggerService } from '../shared/services/logger.service';
import { PostsController } from './posts.controller';
import { DB_CONNECTION } from '../database/database.module';
import { PostSchema } from './repository/posts.schema';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeatureAsync([
      {
        name: 'BlogPost',
        useFactory: async (connection: Connection) => {
          return PostSchema;
          },
        inject: [getConnectionToken(DB_CONNECTION)],
      },
    ], DB_CONNECTION),
  ],
  controllers: [PostsController],
  providers: [
    LoggerService,
    PostsService,
    PostsRepository,
    RedisCacheService,
  ],
})
export class PostsModule {}
