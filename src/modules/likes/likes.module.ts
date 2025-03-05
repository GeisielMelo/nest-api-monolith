import { provideLikesRepository } from './domain/repositories/like.repository.provider'
import { LikesController } from './http/likes.controller'
import { LikesService } from './domain/likes.service'
import { Like } from './domain/models/like.model'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  controllers: [LikesController],
  providers: [LikesService, ...provideLikesRepository()],
})
export class LikesModule {}
