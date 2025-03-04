import { AllExceptionsFilter } from './common/filters/exception.filter'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './ioC/app.module'
import { NestFactory } from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new AllExceptionsFilter())
  app.enableCors({ methods: 'GET,PUT,PATCH,POST,DELETE' })
  await app.listen(3000)
}
bootstrap()
