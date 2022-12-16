import { Inject, Injectable } from '@nestjs/common';
import { LogRepositoryToken } from '../repository/persistence';
import { LogRepository } from '../repository/LogRepository';
import { LogRequestDto } from '../controller/dto/LogRequestDto';

export const LogServiceToken = 'LogServiceToken';

@Injectable()
export class LogService {
  constructor(
    @Inject(LogRepositoryToken)
    private readonly logRepository: LogRepository,
  ) {}

  writeLog(dto: LogRequestDto): void {
    this.logRepository.createLog(dto);
  }
}
