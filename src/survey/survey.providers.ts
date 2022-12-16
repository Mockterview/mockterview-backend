import { SurveyService, SurveyServiceToken } from './service/SurveyService';
import {
  SurveyMongoRepository,
  SurveyRepositoryToken,
  SurveyMapperToken,
  SurveyMongoMapper,
} from './repository/persistence';

export const SurveyServiceProvider = {
  provide: SurveyServiceToken,
  useClass: SurveyService,
};

export const SurveyRepositoryProvider = {
  provide: SurveyRepositoryToken,
  useClass: SurveyMongoRepository,
};

export const SurveyMapperProvider = {
  provide: SurveyMapperToken,
  useClass: SurveyMongoMapper,
};
