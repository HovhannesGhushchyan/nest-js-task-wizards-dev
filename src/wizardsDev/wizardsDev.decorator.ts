import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import {IsInt, IsNotEmpty, IsString, validate} from 'class-validator';
import { Transform } from 'class-transformer';
import { DecoratorHelper } from './../shared/helpers/decorator.helper';

export class PostParam {
  @IsNotEmpty()
  @IsString()
  ip: string;
}

export const getPostParam: any = createParamDecorator(async (data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return getPostParamFactoryFunction(data, request);
});

export async function getPostParamFactoryFunction(data: string, request: Request) {
  const parameters: PostParam = new PostParam();

  parameters.ip = DecoratorHelper.getStringParameter('ip', request);
  
  const errors = await validate(parameters);

  if (errors.length > 0) {
    DecoratorHelper.handleValidationErrors(errors);
  }

  return data && parameters[data] ? parameters[data] : parameters;
}
