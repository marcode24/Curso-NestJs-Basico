import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../decorators/roles.decorator';

import { IPayloadToken } from '../models/token.model';
import { Role } from '../models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if(!roles) {
      return true
    }
    // roles = [ 'admin', 'customer' ]
    const request = context.switchToHttp().getRequest();
    const { role } = request.user as IPayloadToken;
    const isAuth = roles.some(roleAllowed => roleAllowed === role)
    if(!isAuth) {
      throw new UnauthorizedException('You are not allowed to do this');
    }
    return isAuth;
  }
}
