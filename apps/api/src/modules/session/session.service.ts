import { E } from '@faker-js/faker/dist/airline-CLphikKp'
import { HttpStatus, Injectable } from '@nestjs/common'
import { AppException } from '~/common/exceptions/app-exception'
import { THIRTY_DAYS_TTL } from '~/constant/ttl.constant'
import { SessionDto } from '~/dto/session.dto'
import { ErrorCode } from '~/enums/error-code.enum'
import { RedisService } from '~/modules/redis/redis.service'

@Injectable()
export class SessionService {
  constructor(private readonly redisService: RedisService) {}

  private getSessionKey(sessionDto: SessionDto): string {
    if (!sessionDto.userId || !sessionDto.deviceType || !sessionDto.deviceId) {
      throw new AppException('Missing session key information', ErrorCode.BAD_REQUEST, HttpStatus.BAD_REQUEST)
    }
    return `session:user:${sessionDto.userId}:deviceType:${sessionDto.deviceType}:deviceId:${sessionDto.deviceId}`
  }

  async setSession(sessionDto: SessionDto): Promise<void> {
    const sessionKey = this.getSessionKey(sessionDto)
    await this.redisService.client.hset(sessionKey, sessionDto.data)
    await this.redisService.client.expire(sessionKey, THIRTY_DAYS_TTL)
  }

  async getSession(sessionDto: SessionDto): Promise<Record<string, string> | null> {
    const sessionKey = this.getSessionKey(sessionDto)
    const sessionData = await this.redisService.client.hgetall(sessionKey)
    return Object.keys(sessionData).length ? sessionData : null
  }

  async getSessionField(sessionDto: SessionDto): Promise<string | null> {
    const sessionKey = this.getSessionKey(sessionDto)
    const value = await this.redisService.client.hget(sessionKey, sessionDto.field)
    return value ?? null
  }

  async deleteSession(sessionDto: SessionDto): Promise<void> {
    const sessionKey = this.getSessionKey(sessionDto)
    await this.redisService.client.del(sessionKey)
  }

  async deleteOtherDeviceSessions(sessionDto: SessionDto): Promise<void> {
    const pattern = `session:user:${sessionDto.userId}:deviceType:${sessionDto.deviceType}:*`
    const keys = await this.redisService.client.keys(pattern)
    const keysToDelete = keys.filter((key) => !key.endsWith(`deviceId:${sessionDto.keepDeviceId}`))
    if (keysToDelete.length > 0) {
      await this.redisService.client.del(...keysToDelete)
    }
  }
}
