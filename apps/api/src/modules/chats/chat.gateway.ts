import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway(8081, { cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  handleConnection(client: Socket) {
    console.log('New user connected...', client.id)
    this.server.emit('user-joined', {
      message: `New user joined the chat: ${client.id}`
    })
  }

  handleDisconnect(client: Socket) {
    console.log('New user disconnected...', client.id)

    this.server.emit('user-leaved', {
      message: `New user leaved the chat: ${client.id}`
    })
  }

  @SubscribeMessage('new-message')
  handleNewMessage(@MessageBody() message: string) {
    console.log(message)
    this.server.emit('message', message)
  }
}
