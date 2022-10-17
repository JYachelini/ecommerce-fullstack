import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { Chat } from './interfaces/chat.interface';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  get = async (): Promise<Chat[]> => {
    return await this.chatRepository.findAll();
  };

  save = async (message: Chat) => {
    return await this.chatRepository.createEntity(message);
  };
}
