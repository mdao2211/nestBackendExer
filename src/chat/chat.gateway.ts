import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';

interface ChatSocket extends Socket {
  data: {
    username?: string;
  };
}

@WebSocketGateway(3001, {
  namespace: 'chat',
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: ChatSocket) {
    const history = await this.chatService.getAllMessages();
    client.emit('history', history);
  }

  @SubscribeMessage('join')
  handleJoin(
    @ConnectedSocket() client: ChatSocket,
    @MessageBody() data: { username: string },
  ): void {
    client.data.username = data.username;

    client.emit('message', {
      sender: 'System',
      message: `Welcome ${data.username} to chat room.`,
    });

    client.broadcast.emit('message', {
      sender: 'System',
      message: `${data.username} has just joined the chat room.`,
    });
  }

  @SubscribeMessage('chat')
  async handleChat(
    @ConnectedSocket() client: ChatSocket,
    @MessageBody() data: { message: string },
  ): Promise<void> {
    const username = client.data.username || 'Anonymous';

    const savedMessage = await this.chatService.createMessage(
      username,
      data.message,
    );
    // Phát tin nhắn đến tất cả các client
    this.server.emit('message', savedMessage);
  }

  @SubscribeMessage('deleteMessage')
  async handleDeleteMessage(
    @ConnectedSocket() client: ChatSocket,
    @MessageBody() data: { id: number },
  ): Promise<void> {
    await this.chatService.deleteMessage(data.id);
    this.server.emit('messageDeleted', { id: data.id });
  }

  handleDisconnect(client: ChatSocket): void {
    const username = client.data.username || 'A user';
    this.server.emit('message', {
      sender: 'System',
      message: `${username} đã rời phòng chat.`,
    });
  }
}
