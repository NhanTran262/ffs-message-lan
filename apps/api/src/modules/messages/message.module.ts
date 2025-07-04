import { Module } from '@nestjs/common'
import { MessageController } from '~/modules/messages/message.controller'
import { MessageService } from '~/modules/messages/message.service'

@Module({
  imports: [],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {
}
