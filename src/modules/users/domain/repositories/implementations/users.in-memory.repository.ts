import { UsersRepository } from '../user.repository.interface'
import { User } from '../../entities/user.entity'
import { randomUUID } from 'crypto'
import * as bcrypt from 'bcrypt'

interface UserWithId extends User {
  id?: string
  created_at?: Date
  updated_at?: Date
}

export class UsersInMemoryRepository implements UsersRepository {
  private users: UserWithId[] = []

  async create(user: User): Promise<User> {
    const hash = await bcrypt.hash(user.password, 10)
    const newUser = { ...user, id: randomUUID(), password: hash, created_at: new Date(), updated_at: new Date() }
    this.users.push(newUser)
    return newUser
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
    this.users[userIndex] = { ...user, updated_at: new Date() }
    return user
  }

  async remove(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id)
  }
}
