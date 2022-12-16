import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PracticeController } from './controller/PracticeController';
import { practiceSchema } from './practice.schema';
import {
  InquiryServiceProvider,
  PracticeMapperProvider,
  PracticeRepositoryProvider,
  SubmissionServiceProvider,
  LikeServiceProvider,
} from './practice.providers';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([practiceSchema], 'dbmockterview'),
    forwardRef(() => AuthModule),
  ],
  controllers: [PracticeController],
  providers: [
    LikeServiceProvider,
    SubmissionServiceProvider,
    InquiryServiceProvider,
    PracticeRepositoryProvider,
    PracticeMapperProvider,
  ],
  exports: [PracticeRepositoryProvider],
})
export class PracticeModule {}
