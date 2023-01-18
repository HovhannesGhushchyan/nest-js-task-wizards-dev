import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import {Controller, HttpStatus, Get, UseInterceptors, UseFilters, Delete} from '@nestjs/common';
import { PostsService } from './posts.service';
import { HttpExceptionFilter } from '../shared/exceptions/http-exception.filter';
import { LoggerInterceptor } from '../shared/interceptors/logger.interceptor';
import { BlogPost } from './repository/posts.schema';
import { getPostParam } from './posts.decorator';

@ApiTags('posts')
@Controller('posts')
export class PostsController {

  constructor(private readonly postsService: PostsService) { }

  @Get(':ip')
  @UseInterceptors(LoggerInterceptor)
  @UseFilters(HttpExceptionFilter)
  @ApiParam({ name: 'ip', type: String, required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'IP retrieved successfully.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'IP not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Validation failed: ip must be an string.' })
  async findOne(@getPostParam('ip') ip: string): Promise<BlogPost> {
    return await this.postsService.getIP(ip);
  }

  @Delete(':ip')
  @UseInterceptors(LoggerInterceptor)
  @UseFilters(HttpExceptionFilter)
  @ApiParam({ name: 'ip', type: String, required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'IP retrieved successfully.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'IP not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Validation failed: ip must be an string.' })
  async deleteCache(@getPostParam('ip') ip: string): Promise<boolean> {
    return await this.postsService.deleteCache(ip);
  }
}
