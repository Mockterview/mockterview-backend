import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { getCurrentDate } from '../../../utils/utils-time';
import { ObjectID } from 'bson';

export type SurveyMongoDocument = SurveyMongoEntity & Document;

@Schema({
  collection: 'surveys',
  _id: true,
  timestamps: { currentTime: getCurrentDate },
})
export class SurveyMongoEntity {
  @Prop()
  _id: ObjectID;

  @Prop()
  userId: ObjectID;

  @Prop()
  grade: number;

  @Prop()
  comment: string;

  @Prop()
  subComment: string;
}
export const SurveyMongoSchema =
  SchemaFactory.createForClass(SurveyMongoEntity);
