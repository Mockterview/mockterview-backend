import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectID } from 'bson';
import { Answer } from '../../domain/Answer';

export type PracticeMongoDocument = PracticeMongoEntity & Document;

@Schema({
  collection: 'practice',
  _id: true,
})
export class PracticeMongoEntity {
  @Prop()
  _id: ObjectID;

  @Prop()
  title: string;

  @Prop()
  order: number;

  @Prop()
  level: string;

  @Prop()
  category: string;

  @Prop()
  answers: Array<Answer>;

  @Prop()
  code: string;
}
export const PracticeMongoSchema =
  SchemaFactory.createForClass(PracticeMongoEntity);
