import { User } from '../entities/user.entity'

export interface UsersRepository {
  create(user: User): Promise<User>
  update(id: string, user: Partial<User>): Promise<User>
  remove(id: string): Promise<void>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  findAll(): Promise<User[]>
}

export const USERS_REPOSITORY_TOKEN = 'USERS_REPOSITORY_TOKEN'
