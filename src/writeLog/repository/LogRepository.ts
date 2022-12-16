import { LogRequestDto } from '../controller/dto/LogRequestDto';

export interface LogRepository {
  createLog(dto: LogRequestDto): void;
}
