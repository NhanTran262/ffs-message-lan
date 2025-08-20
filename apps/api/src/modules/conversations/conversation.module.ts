import { Module } from '@nestjs/common'
import { ConversationController } from '~/modules/conversations/conversation.controller'
import { ConversationRepository } from '~/modules/conversations/conversation.repository'
import { ConversationService } from '~/modules/conversations/conversation.service'

@Module({
  imports: [],
  controllers: [ConversationController],
  providers: [ConversationService, ConversationRepository],
  exports: [ConversationService, ConversationRepository]
})
export class ConversationModule {}
