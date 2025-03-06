import { User } from '../entities/user.entity'

export interface UsersRepository {
  update(id: string, user: Partial<User>): Promise<User>
  remove(id: string): Promise<void>
}

export const USERS_REPOSITORY_TOKEN = 'USERS_REPOSITORY_TOKEN'
