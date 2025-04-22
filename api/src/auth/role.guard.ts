import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Role } from '../register/register.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly requiredRole: Role) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ user: { role: Role } }>();
    const user = request.user;

    if (!user || user.role !== this.requiredRole) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
