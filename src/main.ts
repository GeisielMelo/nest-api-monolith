import { AllExceptionsFilter } from './common/filters/exception.filter'
import { NestExpressApplication } from '@nestjs/platform-express'
import { corsConfig } from './config/cors.config'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './ioC/app.module'
import { NestFactory } from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new AllExceptionsFilter())
  app.enableCors(corsConfig)
  await app.listen(3000)
}
bootstrap()
