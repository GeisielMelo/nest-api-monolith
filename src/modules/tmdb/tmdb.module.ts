import { TMDBController } from './tmdb.controller'
import { TMDBService } from './tmdb.service'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

@Module({
  imports: [HttpModule],
  controllers: [TMDBController],
  providers: [TMDBService],
})
export class TMDBModule {}
