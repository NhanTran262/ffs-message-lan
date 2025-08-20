import { Injectable, Logger } from '@nestjs/common'
import { ConversationRequestDto } from '~/dto/request/conversation-request.dto'
import { ConversationByCurrentUserResponseDto } from '~/dto/response/conversation-by-current-user-response.dto'
import { ConversationRepository } from '~/modules/conversations/conversation.repository'
import { RedisService } from '~/modules/redis/redis.service'
import { handleWithFallback } from '~/utils/helper.util'

@Injectable()
export class ConversationService {
  private readonly logger = new Logger(ConversationService.name)
  constructor(
    private readonly conversationRepository: ConversationRepository,
    private readonly redisService: RedisService
  ) {}

  async getConversationsByCurrentUserId(currentUserId: bigint): Promise<ConversationByCurrentUserResponseDto[]> {
    return handleWithFallback(
      async () => {
        const conversations = await this.conversationRepository.findConversationsByCurrentUserId(currentUserId)
        return conversations
          .map((conversation) => ({
            userId: conversation.participants[0]?.user.id.toString() || null,
            fullName: conversation.participants[0]?.user.fullName || null,
            avatar: conversation.participants[0]?.user.images[0]?.url || null,
            lastMessage: conversation.messages[0]?.content || '',
            sendAt: conversation.messages[0]?.createdAt || null
          }))
          .sort((firstConversation, secondConversation) => {
            const firstConversationTime = new Date(firstConversation.sendAt).getTime()
            const secondConversationTime = new Date(secondConversation.sendAt).getTime()
            return secondConversationTime - firstConversationTime
          })
      },
      'ConversationService.getConversationsByUserId',
      this.logger
    )
  }

  async createConversation(conversationRequest: ConversationRequestDto): Promise<any> {
    handleWithFallback(
      async () => {
        return this.conversationRepository.saveConversation(conversationRequest)
      },
      'ConversationService.createConversation',
      this.logger
    )
  }
}
