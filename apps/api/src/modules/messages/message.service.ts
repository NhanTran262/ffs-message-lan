import { Injectable, Logger } from '@nestjs/common'
import { MessageRepository } from '~/modules/messages/message.repository'
import { handleWithFallback } from '~/utils/helper.util'

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name)

  constructor(private readonly messageRepository: MessageRepository) {}
  async createMessage(senderId: bigint, receiverId: bigint, conversationId: bigint, content: string): Promise<void> {
    handleWithFallback(
      async () => {
        await this.messageRepository.createMessage(senderId, receiverId, conversationId, content)
      },
      'MessageService.createMessage',
      this.logger
    )
  }
}
