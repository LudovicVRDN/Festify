import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './role.decorator';

function matchRoles(roles, userRole){
  return roles.includes(userRole);
}

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get(Roles, context.getHandler());
   
        const request = context.switchToHttp().getRequest();
        const user = request.user;
          
       if (!roles) {
            return true;
        }
        return matchRoles(roles, user.role);
    }
}

