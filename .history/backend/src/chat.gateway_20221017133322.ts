import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway(8081, { cors: '*' })
export class ChatGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
