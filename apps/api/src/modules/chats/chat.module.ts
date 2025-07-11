import { Module } from '@nestjs/common'
import { ChatGateway } from '~/modules/chats/chat.gateway'

@Module({
  providers: [ChatGateway]
})
export class ChatModule {}
