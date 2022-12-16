import {
  LogMongoRepository,
  LogRepositoryToken,
} from './repository/persistence';
import { LogService, LogServiceToken } from './service/LogService';

export const LogRepositoryProvider = {
  provide: LogRepositoryToken,
  useClass: LogMongoRepository,
};

export const LogServiceProvider = {
  provide: LogServiceToken,
  useClass: LogService,
};
