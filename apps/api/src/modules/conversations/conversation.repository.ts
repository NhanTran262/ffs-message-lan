import { Injectable } from '@nestjs/common'
import { join } from 'path'
import { ConversationRequestDto } from '~/dto/request/conversation-request.dto'
import { PrismaService } from '~/modules/prisma/prisma.service'

@Injectable()
export class ConversationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findConversationsByCurrentUserId(currentUserId: bigint) {
    return await this.prismaService.conversation.findMany({
      where: {
        isPrivate: true,
        isDeleted: false,
        participants: {
          some: {
            userId: currentUserId
          }
        }
      },
      select: {
        id: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: {
            id: true,
            content: true,
            createdAt: true
          }
        },
        participants: {
          where: {
            userId: { not: currentUserId }
          },
          select: {
            user: {
              select: {
                id: true,
                fullName: true,
                images: {
                  where: { isAvatar: true, isDeleted: false },
                  take: 1,
                  select: { url: true }
                }
              }
            }
          }
        }
      }
    })
  }

  async saveConversation(conversationData: ConversationRequestDto) {
    const participantData = conversationData.participantIds?.map((userId) => {
      const isCreator = userId === conversationData.currentUserId
      return {
        user: { connect: { id: userId } },
        isMember: true,
        isOwner: conversationData.isGroup ? isCreator : false,
        isAdmin: conversationData.isGroup ? isCreator : false
      }
    })
    return await this.prismaService.conversation.create({
      data: {
        name: conversationData.name,
        isPrivate: conversationData.isPrivate,
        isGroup: conversationData.isGroup,
        participants: {
          create: participantData
        }
      }
    })
  }
}
