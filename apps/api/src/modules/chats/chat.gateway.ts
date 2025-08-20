import { JwtService } from '@nestjs/jwt'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { ConversationService } from '~/modules/conversations/conversation.service'
import { MessageService } from '~/modules/messages/message.service'

@WebSocketGateway(8081, { cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  constructor(
    private readonly jwtService: JwtService,
    private readonly messageService: MessageService,
    private readonly conversationService: ConversationService
  ) {}
  handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token || client.handshake.headers?.authorization.replace('Bearer ', '')
      if (!token) {
        console.error('No token provided')
        client.disconnect()
        return
      }
      const payload = this.jwtService.verify(token)
      client.data.user = payload
      console.log(`User ${payload.id} connected`, client.id)
      this.server.emit('user-joined', {
        message: `User ${payload.id} joined the chat: ${client.id}`
      })
    } catch (error) {
      console.error('Error during connection:', error)
      client.disconnect()
      return
    }
  }

  handleDisconnect(client: Socket) {
    console.log('New user disconnected...', client.id)

    this.server.emit('user-leaved', {
      message: `New user leaved the chat: ${client.id}`
    })
  }

  @SubscribeMessage('new-message')
  async handleNewMessage(
    @MessageBody()
    payload: {
      conversationId: bigint
      receiverId: bigint
      content: string
    },
    @ConnectedSocket() client: Socket
  ) {
    const sender = client.data.user
    const { content, conversationId, receiverId } = payload
    const message = await this.messageService.createMessage(sender.id, receiverId, conversationId, content)
    this.server.to(sender.id.toString()).emit('new-message', message)
    this.server.to(receiverId.toString()).emit('new-message', message)
  }
}
