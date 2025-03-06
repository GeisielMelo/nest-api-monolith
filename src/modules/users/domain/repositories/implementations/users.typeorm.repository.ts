import { UsersRepository } from '../user.repository.interface'
import { BadRequestException } from '@nestjs/common'
import { User } from '../../models/user.model'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

export class UsersTypeORMRepository implements UsersRepository {
  constructor(private readonly userRepository: Repository<User>) {}

  async create(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10)
    user.created_at = new Date()
    user.updated_at = new Date()
    return this.userRepository.save(user)
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id: +id })
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email })
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async update(id: string, user: User): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ id: +id })
    const isPasswordValid = await bcrypt.compare(user.password, existingUser.password)
    if (!isPasswordValid) throw new BadRequestException('Invalid password.')

    user.password = await bcrypt.hash(user.password, 10)
    await this.userRepository.update(id, { ...user, updated_at: new Date() })
    return { ...existingUser, ...user }
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
