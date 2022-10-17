import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ChatService } from './chat.service';
import { Chat } from './interfaces/chat.interface';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('/')
  async getChat(@Res() res: Response) {
    const chat = await this.chatService.get();

    return res.status(HttpStatus.OK).json(chat);
  }

  @Post('/')
  async saveMessage(@Res() res: Response, @Body() chat: Chat) {
    const message = await this.chatService.save(chat);
    if (message.errors) return res.status(HttpStatus.BAD_REQUEST).json(message);
    else
      return res.status(HttpStatus.OK).json({
        message: 'Message saved.',
        data: message,
      });
  }
}
