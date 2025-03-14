import { provideLikesRepository } from './domain/repositories/like.repository.provider'
import { LikesController } from './http/likes.controller'
import { LikesService } from './domain/likes.service'
import { Like } from './domain/models/like.model'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  controllers: [LikesController],
  providers: [LikesService, JwtService, ...provideLikesRepository()],
})
export class LikesModule {}
