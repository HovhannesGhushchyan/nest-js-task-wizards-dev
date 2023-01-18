import { Injectable } from '@nestjs/common';
import { PostsRepository } from './repository/posts.repository';
import { BlogPost } from './repository/posts.schema';
import { HttpService } from "@nestjs/axios";
import * as process from "process";
import { CACHE_DURATION, RedisCacheService } from "../shared/cache/redis-cache.service";

@Injectable()
export class PostsService {

  constructor(
    private http: HttpService,
    private readonly postsRepository: PostsRepository,
    private readonly redisCacheService: RedisCacheService) {}

  async getIP(ip: string): Promise<BlogPost> {
    const checkIpInCache =  await this.redisCacheService.getFromCache(ip) as unknown as BlogPost;

    if (!checkIpInCache) {
      const { data } = await this.http
          .get(`${process.env.IP_HOST}${ip}`).toPromise();
      await Promise.all([
        this.postsRepository.create(data),
        this.redisCacheService.setItem(data.ip, CACHE_DURATION.posts, data)
      ])

      return data;
    }

    return checkIpInCache;
  }

  async deleteCache(ip: string): Promise<boolean> {
     return this.redisCacheService.deleteFromCache(ip);
  }
}
