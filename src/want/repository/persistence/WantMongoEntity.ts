import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectID } from 'bson';
export type WantMongoDocument = WantMongoEntity & Document;

@Schema({
  collection: 'wants',
  _id: true,
})
export class WantMongoEntity {
  @Prop()
  _id: ObjectID;

  @Prop()
  pageName: string;

  @Prop()
  wantCount: number;
}
export const WantMongoSchema = SchemaFactory.createForClass(WantMongoEntity);
