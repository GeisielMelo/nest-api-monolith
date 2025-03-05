import { LikesRepository } from '../like.repository.interface'
import { Like } from '../../entities/like.entity'
import { randomUUID } from 'crypto'

interface LikeExtended extends Like {
  id?: string
  user_id: number
  created_at?: Date
  updated_at?: Date
}

export class LikesInMemoryRepository implements LikesRepository {
  private likes: LikeExtended[] = []

  async create(like: Like): Promise<Like> {
    const newLike = { ...like, id: randomUUID(), created_at: new Date(), updated_at: new Date() }
    this.likes.push(newLike)
    return newLike
  }

  async findAllById(user_id: string): Promise<Like[] | null> {
    return this.likes.filter((like) => like.user_id === +user_id)
  }

  async update(id: string, like: Like): Promise<Like> {
    const userIndex = this.likes.findIndex((like) => like.id === id)
    this.likes[userIndex] = { ...like, updated_at: new Date() }
    return like
  }

  async remove(id: string): Promise<void> {
    this.likes = this.likes.filter((like) => like.id !== id)
  }
}
