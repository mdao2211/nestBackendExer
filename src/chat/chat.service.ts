// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './entity/chat-message.entity';
@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private chatRepository: Repository<ChatMessage>,
  ) {}

  async createMessage(sender: string, message: string): Promise<ChatMessage> {
    const chatMessage = this.chatRepository.create({ sender, message });
    return this.chatRepository.save(chatMessage);
  }

  async getAllMessages(): Promise<ChatMessage[]> {
    return this.chatRepository.find({ order: { createdAt: 'ASC' } });
  }

  async deleteMessage(id: number): Promise<void> {
    await this.chatRepository.delete(id);
  }
}
