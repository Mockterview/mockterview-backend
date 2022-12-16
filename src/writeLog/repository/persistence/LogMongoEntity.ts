import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { getCurrentDate } from '../../../utils/utils-time';
import { ObjectID } from 'bson';

export type LogMongoDocument = LogMongoEntity & Document;

@Schema({
  collection: 'logs',
  _id: true,
  timestamps: { currentTime: getCurrentDate },
})
export class LogMongoEntity {
  @Prop()
  _id: ObjectID;

  @Prop()
  deviceId: string;

  @Prop()
  pageName: string;

  @Prop()
  referrer: string;

  @Prop()
  agent: string;

  @Prop()
  url: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
export const LogMongoSchema = SchemaFactory.createForClass(LogMongoEntity);
