import { LIKES_REPOSITORY_TOKEN, LikesRepository } from './repositories/like.repository.interface'
import { CreateLikeDto } from '../http/dtos/create-like.dto'
import { UpdateLikeDto } from '../http/dtos/update-like.dto'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class LikesService {
  constructor(
    @Inject(LIKES_REPOSITORY_TOKEN)
    private readonly likeRepository: LikesRepository,
  ) {}

  async create(likeDto: CreateLikeDto) {
    return await this.likeRepository.create(likeDto)
  }

  async findAllById(id: string) {
    return await this.likeRepository.findAllById(id)
  }

  async update(id: string, likeDto: UpdateLikeDto) {
    return await this.likeRepository.update(id, likeDto)
  }

  async remove(id: string) {
    return await this.likeRepository.remove(id)
  }
}
