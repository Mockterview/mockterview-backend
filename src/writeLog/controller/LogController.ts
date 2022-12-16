import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LogService, LogServiceToken } from '../service/LogService';
import { LogRequestDto } from './dto/LogRequestDto';

@Controller('logs')
export class LogController {
  constructor(
    @Inject(LogServiceToken)
    private readonly logService: LogService,
  ) {}

  @Post('tracking')
  createLog(@Body() dto: LogRequestDto): void {
    this.logService.writeLog(dto);
  }
}
