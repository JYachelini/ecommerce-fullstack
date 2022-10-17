import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, ChatRepository],
})
export class ChatModule {}
