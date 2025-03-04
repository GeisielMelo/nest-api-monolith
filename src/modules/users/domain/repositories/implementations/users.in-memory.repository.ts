import { UsersRepository } from '../user.repository.interface'
import { User } from '../../entities/users.entity'

interface UserWithId extends User {
  id?: string
}

export class UsersInMemoryRepository implements UsersRepository {
  private users: UserWithId[] = []

  async create(user: User): Promise<User> {
    this.users.push(user)
    return user
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null
  }

  async findAll(): Promise<User[]> {
    return this.users
  }

  async update(id: string, user: User): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id)
    this.users[userIndex] = user
    return user
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id)
  }
}
