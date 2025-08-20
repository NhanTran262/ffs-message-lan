import { Module } from '@nestjs/common'
import { MessageController } from '~/modules/messages/message.controller'
import { MessageRepository } from '~/modules/messages/message.repository'
import { MessageService } from '~/modules/messages/message.service'

@Module({
  imports: [],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository],
  exports: [MessageService, MessageRepository]
})
export class MessageModule {}
