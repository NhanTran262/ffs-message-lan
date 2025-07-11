import { Injectable } from '@nestjs/common'
import { PrismaService } from '~/modules/prisma/prisma.service'

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByPhone(phone: string) {
    return this.prismaService.user.findFirst({
      where: { phone, isDeleted: false },
      select: {
        id: true,
        phone: true,
        fullName: true,
        password: true,
        userRoles: {
          select: {
            role: {
              select: { name: true }
            }
          }
        },
        images: {
          where: { isAvatar: true, isDeleted: false },
          take: 1,
          select: { url: true }
        }
      }
    })
  }
}
