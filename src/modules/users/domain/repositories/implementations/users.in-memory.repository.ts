import { UsersRepository } from '../user.repository.interface'
import { User } from '../../entities/user.entity'
import * as bcrypt from 'bcrypt'

interface UserWithId extends User {
  id?: string
  created_at?: Date
  updated_at?: Date
}

export class UsersInMemoryRepository implements UsersRepository {
  private users: UserWithId[] = []

  async update(id: string, user: User): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id)
    const hash = await bcrypt.hash(user.password, 10)
    this.users[userIndex] = { ...user, password: hash, updated_at: new Date() }
    return user
  }

  async remove(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id)
  }
}
