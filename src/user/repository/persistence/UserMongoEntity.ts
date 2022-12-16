import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { getCurrentDate } from '../../../utils/utils-time';
import { ObjectID } from 'bson';
import { StudyDay } from '../../domain/StudyDay';

export type UserMongoDocument = UserMongoEntity & Document;

@Schema({
  collection: 'users',
  _id: true,
  timestamps: { currentTime: getCurrentDate },
})
export class UserMongoEntity {
  @Prop()
  _id: ObjectID;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop()
  refreshToken: string;

  @Prop()
  changePassVerifyToken: string;

  @Prop()
  studyDay: StudyDay[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserMongoSchema = SchemaFactory.createForClass(UserMongoEntity);
