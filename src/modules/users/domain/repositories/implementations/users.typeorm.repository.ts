import { UsersRepository } from '../user.repository.interface'
import { User } from '../../models/users.model'
import { Repository } from 'typeorm'

export class UsersTypeORMRepository implements UsersRepository {
  constructor(private readonly userRepository: Repository<User>) {}

  async create(user: User): Promise<User> {
    return this.userRepository.save({ ...user, created_at: new Date(), updated_at: new Date() })
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userRepository.findOneByOrFail({ id: +id })
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneByOrFail({ email })
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async update(id: string, user: User): Promise<User> {
    await this.userRepository.update(id, { ...user, updated_at: new Date() })
    return user
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
