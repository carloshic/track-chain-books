import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();

    const reflector = new Reflector();

    const isPublic = reflector.get<boolean>('isPublic', context.getHandler());

    if (isPublic) {
      return true;
    }

    if (!ctx.user) {
      throw new UnauthorizedException('Authentication Required');
    }
    return true;
  }
}
