import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { LikesService } from '../domain/likes.service'
import { CreateLikeDto } from './dtos/create-like.dto'
import { Like } from '../domain/entities/like.entity'
import { UpdateLikeDto } from './dtos/update-like.dto'

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(@Body() likeDto: CreateLikeDto) {
    return this.likesService.create(likeDto)
  }

  @Get(':id')
  findAllById(@Param('id') id: string): Promise<Like[]> {
    return this.likesService.findAllById(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UpdateLikeDto) {
    return this.likesService.update(id, userDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likesService.remove(id)
  }
}
