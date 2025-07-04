import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { GlobalExceptionFilter } from '~/common/filters/global-exception.filter'
import { ApiResponseInterceptor } from '~/common/interceptors/api-response.interceptor'
import { RedisIoAdapter } from '~/modules/adapters/redis-io.adapter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  })
  app.useGlobalFilters(new GlobalExceptionFilter())
  app.useGlobalInterceptors(new ApiResponseInterceptor())

  const redisIoAdapter = new RedisIoAdapter(app)
  await redisIoAdapter.connectToRedis()
  app.useWebSocketAdapter(redisIoAdapter)
  await app.listen(process.env.PORT ?? 8080)
}

bootstrap().catch((err) => {
  console.error('Error starting the application:', err)
  process.exit(1)
})
