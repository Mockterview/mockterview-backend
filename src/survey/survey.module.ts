import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { surveySchema } from './survey.schema';
import { AuthModule } from '../auth/auth.module';
import {
  SurveyMapperProvider,
  SurveyRepositoryProvider,
  SurveyServiceProvider,
} from './survey.providers';
import { SurveyController } from './controller/SurveyController';

@Module({
  imports: [
    MongooseModule.forFeature([surveySchema], 'dbmockterview'),
    forwardRef(() => AuthModule),
  ],
  controllers: [SurveyController],
  providers: [
    SurveyServiceProvider,
    SurveyRepositoryProvider,
    SurveyMapperProvider,
  ],
})
export class SurveyModule {}
