import { Body, Controller, Inject, Post, Query } from '@nestjs/common';
import { WantService, WantServiceToken } from '../service/WantService';
import { WantResponseDto } from './dto/response/WantResponseDto';

@Controller('want-it')
export class WantController {
  constructor(
    @Inject(WantServiceToken)
    private readonly wantService: WantService,
  ) {}

  @Post()
  async countWant(
    @Body('pageName') pageName: string,
  ): Promise<WantResponseDto> {
    return this.wantService.countWantByPageName(pageName);
  }
}
