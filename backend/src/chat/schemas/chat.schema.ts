import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Author } from '../interfaces/chat.interface';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ required: true, type: Object })
  author: Author;

  @Prop({ required: true })
  message: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
