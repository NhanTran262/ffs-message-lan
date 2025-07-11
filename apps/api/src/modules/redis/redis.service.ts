import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'

@Injectable()
export class RedisService {
  public readonly client: Redis
  public readonly pubClient: Redis
  public readonly subClient: Redis

  constructor() {
    this.client = new Redis('redis://localhost:6379/0')
    this.pubClient = new Redis('redis://localhost:6379/0')
    this.subClient = new Redis('redis://localhost:6379/0')
  }

  async onModuleDestroy() {
    await Promise.all([this.client.quit(), this.pubClient.quit(), this.subClient.quit()])
  }
}
