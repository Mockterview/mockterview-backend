import {
  InterviewMongoEntity,
  InterviewMongoSchema,
} from './repository/persistence';

export const InterviewSchema = {
  name: InterviewMongoEntity.name,
  schema: InterviewMongoSchema,
};
