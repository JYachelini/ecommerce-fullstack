import { Document, ObjectId } from 'mongoose';

export interface Author {
  _id: ObjectId;
  username: string;
}

export interface Chat extends Document {
  author: {};
  username: string;
}
