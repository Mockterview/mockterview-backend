import { PracticeMongoEntity } from './PracticeMongoEntity';
import { Injectable } from '@nestjs/common';
import { Practice } from '../../domain/Practice';

export const PracticeMapperToken = 'PracticeMapperToken';

@Injectable()
export class PracticeMongoMapper {
  mapEntityToDomain(practice: PracticeMongoEntity) {
    return new Practice(
      practice._id.toHexString(),
      practice.title,
      practice.order,
      practice.level,
      practice.category,
      practice.answers,
      practice.code,
    );
  }
}
