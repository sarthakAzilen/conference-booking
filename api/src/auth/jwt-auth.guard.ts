import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

// Extend the Request interface to include the user property
declare module 'express' {
  export interface Request {
    user?: { userId: string; role: string };
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    try {
      const payload = this.jwtService.verify<{ id: string; role: string }>(
        token,
        {
          secret: process.env.JWT_SECRET ?? 'default_secret', // Ensure this matches the .env JWT_SECRET
        },
      );

      request.user = { userId: payload.id, role: payload.role }; // Map payload to match the user type
    } catch (err) {
      console.error('JWT verification failed:', err); // Log the error for debugging
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1]; // Extract the token after "Bearer "
    }
    return null;
  }
}
