import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewController } from './controller/InterviewController';
import { InterviewSchema } from './interview.schema';
import {
  GetInterviewServiceProvider,
  InterviewInquiryServiceProvider,
  InterviewMapperProvider,
  InterviewRepositoryProvider,
  InterviewSubmissionServiceProvider,
} from './interview.providers';
import { PracticeModule } from '../practice/practice.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([InterviewSchema], 'dbmockterview'),
    forwardRef(() => AuthModule),
    PracticeModule,
  ],
  controllers: [InterviewController],
  providers: [
    InterviewInquiryServiceProvider,
    InterviewSubmissionServiceProvider,
    GetInterviewServiceProvider,
    InterviewRepositoryProvider,
    InterviewMapperProvider,
  ],
  exports: [InterviewRepositoryProvider],
})
export class InterviewModule {}
