import { Like } from '../entities/like.entity'

export interface LikesRepository {
  create(like: Like): Promise<Like>
  update(id: string, like: Partial<Like>): Promise<Like>
  remove(id: string): Promise<void>
  findAllById(id: string): Promise<Like[]>
}

export const LIKES_REPOSITORY_TOKEN = 'LIKES_REPOSITORY_TOKEN'
