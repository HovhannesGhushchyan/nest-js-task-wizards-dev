import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import {Controller, HttpStatus, Get, UseInterceptors, UseFilters, Delete} from '@nestjs/common';
import { WizardsDevService } from './wizardsDev.service';
import { HttpExceptionFilter } from '../shared/exceptions/http-exception.filter';
import { LoggerInterceptor } from '../shared/interceptors/logger.interceptor';
import { BlogPost } from './repository/posts.schema';
import { getPostParam } from './wizardsDev.decorator';

@ApiTags('posts')
@Controller('posts')
export class WizardsDevController {

  constructor(private readonly wizardsDevService: WizardsDevService) { }

  @Get(':ip')
  @UseInterceptors(LoggerInterceptor)
  @UseFilters(HttpExceptionFilter)
  @ApiParam({ name: 'ip', type: String, required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'IP retrieved successfully.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'IP not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Validation failed: ip must be an string.' })
  async findOne(@getPostParam('ip') ip: string): Promise<BlogPost> {
    return await this.wizardsDevService.getIP(ip);
  }

  @Delete(':ip')
  @UseInterceptors(LoggerInterceptor)
  @UseFilters(HttpExceptionFilter)
  @ApiParam({ name: 'ip', type: String, required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'IP retrieved successfully.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'IP not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Validation failed: ip must be an string.' })
  async deleteCache(@getPostParam('ip') ip: string): Promise<boolean> {
    return await this.wizardsDevService.deleteCache(ip);
  }
}
