import { provideAuthRepository } from './domain/repositories/auth.repository.provider'
import { User } from '../users/domain/models/user.model'
import { AuthController } from './http/auth.controller'
import { AuthService } from './domain/auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, ...provideAuthRepository()],
})
export class AuthModule {}
