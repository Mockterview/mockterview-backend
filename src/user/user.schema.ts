import { UserMongoEntity, UserMongoSchema } from './repository/persistence';

export const userSchema = {
  name: UserMongoEntity.name,
  schema: UserMongoSchema,
};
