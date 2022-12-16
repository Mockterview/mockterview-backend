import {
  WantMongoRepository,
  WantRepositoryToken,
} from './repository/persistence';
import { WantService, WantServiceToken } from './service/WantService';

export const WantServiceProvider = {
  provide: WantServiceToken,
  useClass: WantService,
};

export const WantRepositoryProvider = {
  provide: WantRepositoryToken,
  useClass: WantMongoRepository,
};
