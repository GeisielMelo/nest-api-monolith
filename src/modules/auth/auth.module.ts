import { provideAuthRepository } from './domain/repositories/auth.repository.provider'
import { User } from '../users/domain/models/user.model'
import { AuthController } from './http/auth.controller'
import { AuthService } from './domain/auth.service'
import { Token } from './domain/models/token.model'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([User, Token])],
  controllers: [AuthController],
  providers: [AuthService, JwtService, ...provideAuthRepository()],
})
export class AuthModule {}
