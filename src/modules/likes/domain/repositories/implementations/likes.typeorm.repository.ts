import { LikesRepository } from '../like.repository.interface'
import { Like } from '../../models/like.model'
import { Repository } from 'typeorm'

export class LikesTypeORMRepository implements LikesRepository {
  constructor(private readonly likeRepository: Repository<Like>) {}

  async create(like: Like): Promise<Like> {
    like.created_at = new Date()
    like.updated_at = new Date()
    return this.likeRepository.save(like)
  }

  async findAllById(id: string): Promise<Like[]> {
   return this.likeRepository.find({ where: { user_id: +id } })
  }

  async update(id: string, like: Like): Promise<Like> {
    await this.likeRepository.update(id, { ...like, updated_at: new Date() })
    return like
  }

  async remove(id: string): Promise<void> {
    await this.likeRepository.delete(id)
  }
}
