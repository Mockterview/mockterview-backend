import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard)
  @Get('test')
  authGuardTest(): string {
    return 'Auth Guard Test.';
  }
}
