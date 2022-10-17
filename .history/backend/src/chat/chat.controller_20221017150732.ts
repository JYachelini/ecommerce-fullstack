import { Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('/')
  async getChat(@Res() res: Response) {
    const chat = await this.chatService.get();

    return res.status(HttpStatus.OK).json(chat);
  }

  @Post('/')
  async saveMessage(@Res() res: Response) {}
}
