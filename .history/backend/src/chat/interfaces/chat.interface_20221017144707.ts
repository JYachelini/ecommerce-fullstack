import { Document, ObjectId } from 'mongoose';

export interface Author {
  id: ObjectId;
  username: string;
}

export interface Chat extends Document {
  author: Author;
  username: string;
}