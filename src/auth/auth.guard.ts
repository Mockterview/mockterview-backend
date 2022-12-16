import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService, TokenServiceToken } from './service/TokenService';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(TokenServiceToken)
    private readonly tokenService: TokenService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request: Request) {
    const accessToken = request.headers.authorization.split('Bearer ')[1];
    return this.tokenService.verifyAccessToken(accessToken);
  }
}
