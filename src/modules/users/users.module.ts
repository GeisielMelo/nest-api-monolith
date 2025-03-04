import { provideUsersRepository } from './domain/repositories/user.repository.provider'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { UsersController } from './http/user.controller'
import { UsersService } from './domain/users.service'
import { UserResolver } from './http/user.resolver'
import { User } from './domain/models/users.model'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, ...provideUsersRepository(), UserResolver],
})
export class UsersModule {}
