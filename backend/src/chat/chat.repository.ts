import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/db/entity.repository';
import { ChatDocument } from './schemas/chat.schema';

@Injectable()
export class ChatRepository extends EntityRepository<ChatDocument> {
  constructor(@InjectModel('Chat') chatModel: Model<ChatDocument>) {
    super(chatModel);
  }
}
