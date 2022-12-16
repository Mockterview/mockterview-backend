import { Injectable } from '@nestjs/common';
import { Interview } from '../../domain/Interview';
import { InterviewMongoEntity } from './InterviewMongoEntity';

export const InterviewMapperToken = 'InterviewMapperToken';

@Injectable()
export class InterviewMongoMapper {
  mapEntityToDomain(interview: InterviewMongoEntity) {
    return new Interview(
      interview._id.toHexString(),
      interview.userId.toHexString(),
      interview.category,
      interview.round,
      interview.score,
      interview.questions,
      interview.isCompleted,
    );
  }
}
