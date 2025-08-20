import { HttpStatus, Injectable } from '@nestjs/common'
import { AuthRequest } from '~/dto/request/auth-request.dto'
import { PrismaService } from '~/modules/prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { AppException } from '~/common/exceptions/app-exception'
import { ErrorCode } from '~/enums/error-code.enum'
import { ErrorMessage } from '~/constant/error-message.constant'

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByPhone(phone: string) {
    return await this.prismaService.user.findFirst({
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

  async saveUser(authRequest: AuthRequest) {
    try {
      return await this.prismaService.user.create({
        data: {
          phone: authRequest.phone,
          fullName: authRequest.fullName,
          password: await bcrypt.hash(authRequest.password, 10),
          userRoles: {
            create: {
              roleId: BigInt(2)
            }
          },
          images: {
            create: {
              name: 'Default Avatar',
              url: 'https://example.com/default-avatar.png',
              isAvatar: true
            }
          }
        }
      })
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new AppException(ErrorMessage.PHONE_CONFLICT, ErrorCode.CONFLICT, HttpStatus.CONFLICT)
      }
      throw error
    }
  }
}
