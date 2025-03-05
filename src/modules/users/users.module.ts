import { provideUsersRepository } from './domain/repositories/user.repository.provider'
import { UsersController } from './http/users.controller'
import { UsersService } from './domain/users.service'
import { User } from './domain/models/user.model'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, ...provideUsersRepository()],
})
export class UsersModule {}
