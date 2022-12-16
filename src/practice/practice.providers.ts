import { InquiryService, InquiryServiceToken } from './service/InquiryService';
import {
  PracticeMongoRepository,
  PracticeRepositoryToken,
  PracticeMongoMapper,
  PracticeMapperToken,
} from './repository/persistence';
import {
  SubmissionService,
  SubmissionServiceToken,
} from './service/SubmissionService';
import { LikeService, LikeServiceToken } from './service/LikeService';

export const InquiryServiceProvider = {
  provide: InquiryServiceToken,
  useClass: InquiryService,
};

export const PracticeRepositoryProvider = {
  provide: PracticeRepositoryToken,
  useClass: PracticeMongoRepository,
};

export const PracticeMapperProvider = {
  provide: PracticeMapperToken,
  useClass: PracticeMongoMapper,
};

export const SubmissionServiceProvider = {
  provide: SubmissionServiceToken,
  useClass: SubmissionService,
};

export const LikeServiceProvider = {
  provide: LikeServiceToken,
  useClass: LikeService,
};
