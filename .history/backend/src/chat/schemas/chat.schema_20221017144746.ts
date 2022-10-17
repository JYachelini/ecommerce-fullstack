import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Author } from '../interfaces/chat.interface';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ required: true })
  author: Author;

  @Prop({ required: true })
  message: string;
}
