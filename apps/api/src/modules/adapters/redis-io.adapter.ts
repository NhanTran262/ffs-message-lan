import { INestApplicationContext } from '@nestjs/common'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { createAdapter } from '@socket.io/redis-adapter'
import { ServerOptions } from 'socket.io'
import { RedisService } from '~/modules/redis/redis.service'

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>

  constructor(private app: INestApplicationContext) {
    super()
  }

  async connectToRedis(): Promise<void> {
    const redisService = this.app.get(RedisService)
    this.adapterConstructor = createAdapter(redisService.pubClient, redisService.subClient)
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options)
    server.adapter(this.adapterConstructor)
    return server
  }
}
