import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectID } from 'bson';
import { Practice } from '../../../practice/domain/Practice';
import { getCurrentDate } from '../../../utils/utils-time';

export type InterviewMongoDocument = InterviewMongoEntity & Document;

@Schema({
  collection: 'interviews',
  _id: true,
  timestamps: { currentTime: getCurrentDate },
})
export class InterviewMongoEntity {
  @Prop()
  _id: ObjectID;

  @Prop()
  userId: ObjectID;

  @Prop()
  category: string;

  @Prop()
  round: number;

  @Prop()
  score: number;

  @Prop()
  questions: Array<Practice>;

  @Prop()
  isCompleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
export const InterviewMongoSchema =
  SchemaFactory.createForClass(InterviewMongoEntity);
