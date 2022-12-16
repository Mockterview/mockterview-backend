import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { PracticeModule } from '../practice/practice.module';
import { SubmissionService } from '../practice/service/SubmissionService';

@Module({
  imports: [PracticeModule],
  providers: [EventsGateway, SubmissionService],
})
export class EventsModule {}
