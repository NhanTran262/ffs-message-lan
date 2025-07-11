import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import { GlobalExceptionFilter } from '~/common/filters/global-exception.filter'
import { ApiResponseInterceptor } from '~/common/interceptors/api-response.interceptor'
import { enableCORS } from '~/config/cors.config'
import { RedisIoAdapter } from '~/modules/adapters/redis-io.adapter'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors(enableCORS)
  app.useGlobalFilters(new GlobalExceptionFilter())
  app.useGlobalInterceptors(new ApiResponseInterceptor())
  app.use(cookieParser())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  const redisIoAdapter = new RedisIoAdapter(app)
  await redisIoAdapter.connectToRedis()
  app.useWebSocketAdapter(redisIoAdapter)
  await app.listen(process.env.PORT ?? 8080)
}

bootstrap().catch((err) => {
  console.error('Error starting the application:', err)
  process.exit(1)
})
