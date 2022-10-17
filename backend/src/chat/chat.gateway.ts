import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Chat } from './interfaces/chat.interface';

@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway {
  constructor(private chatService: ChatService) {}
  @WebSocketServer()
  server;
  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() message: Chat,
    payload: any,
  ): Promise<void> {
    // await this.chatService.save(message);

    this.server.emit('message', message);
  }
}
