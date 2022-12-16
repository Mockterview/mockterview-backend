import { LogMongoEntity, LogMongoSchema } from './repository/persistence';

export const logSchema = {
  name: LogMongoEntity.name,
  schema: LogMongoSchema,
};
