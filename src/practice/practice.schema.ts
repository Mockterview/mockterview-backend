import {
  PracticeMongoEntity,
  PracticeMongoSchema,
} from './repository/persistence';

export const practiceSchema = {
  name: PracticeMongoEntity.name,
  schema: PracticeMongoSchema,
};
