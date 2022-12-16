import {
  InterviewMapperToken,
  InterviewMongoMapper,
  InterviewMongoRepository,
  InterviewRepositoryToken,
} from './repository/persistence';
import {
  InterviewInquiryService,
  InterviewInquiryServiceToken,
} from './service/InterviewInquiryService';
import {
  InterviewSubmissionService,
  InterviewSubmissionServiceToken,
} from './service/InterviewSubmissionService';
import {
  GetInterviewService,
  GetInterviewServiceToken,
} from './service/GetInterviewService';

export const InterviewInquiryServiceProvider = {
  provide: InterviewInquiryServiceToken,
  useClass: InterviewInquiryService,
};

export const InterviewRepositoryProvider = {
  provide: InterviewRepositoryToken,
  useClass: InterviewMongoRepository,
};

export const InterviewMapperProvider = {
  provide: InterviewMapperToken,
  useClass: InterviewMongoMapper,
};

export const InterviewSubmissionServiceProvider = {
  provide: InterviewSubmissionServiceToken,
  useClass: InterviewSubmissionService,
};

export const GetInterviewServiceProvider = {
  provide: GetInterviewServiceToken,
  useClass: GetInterviewService,
};
