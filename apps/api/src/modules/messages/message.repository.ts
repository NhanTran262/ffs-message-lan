import { Injectable } from '@nestjs/common'
import { PrismaService } from '~/modules/prisma/prisma.service'

@Injectable()
export class MessageRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createMessage(senderId: bigint, receiverId: bigint, conversationId: bigint, content: string): Promise<void> {
    await this.prismaService.message.create({
      data: {
        senderId,
        receiverId,
        conversationId,
        content,
        createdAt: new Date()
      }
    })
  }
}
