import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { AuthGuard } from '~/common/guard/auth.guard'
import { ConversationRequestDto } from '~/dto/request/conversation-request.dto'
import { ConversationByCurrentUserResponseDto } from '~/dto/response/conversation-by-current-user-response.dto'
import { ConversationService } from '~/modules/conversations/conversation.service'

@Controller('v1/conversations')
export class ConversationController {
  constructor(private readonly conversation: ConversationService) {}

  @UseGuards(AuthGuard) // *Assuming AuthGuard is defined in your project
  @Get()
  async getConversationsByCurrentUserId(@Req() request: Request): Promise<ConversationByCurrentUserResponseDto[]> {
    const currentUserId = BigInt(request.user?.sub) || BigInt(1)
    console.log('Fetching conversations for user ID:', currentUserId)
    // *Replace with actual user ID retrieval logic
    return this.conversation.getConversationsByCurrentUserId(currentUserId)
  }

  // @UseGuards(AuthGuard) // *Assuming AuthGuard is defined in your project
  @Post()
  async createConversation(@Body() conversationRequest: ConversationRequestDto): Promise<any> {
    console.log('Creating conversation with request:', conversationRequest)

    return this.conversation.createConversation(conversationRequest)
  }
}
