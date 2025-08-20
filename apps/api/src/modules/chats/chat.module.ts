import { Module } from '@nestjs/common'
import { ChatGateway } from '~/modules/chats/chat.gateway'
import { ConversationModule } from '~/modules/conversations/conversation.module'
import { ConversationRepository } from '~/modules/conversations/conversation.repository'
import { ConversationService } from '~/modules/conversations/conversation.service'
import { MessageModule } from '~/modules/messages/message.module'
import { MessageRepository } from '~/modules/messages/message.repository'
import { MessageService } from '~/modules/messages/message.service'

@Module({
  imports: [MessageModule, ConversationModule],
  providers: [ChatGateway]
})
export class ChatModule {}
