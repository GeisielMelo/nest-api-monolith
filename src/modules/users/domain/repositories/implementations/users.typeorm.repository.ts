import { UsersRepository } from '../user.repository.interface'
import { BadRequestException } from '@nestjs/common'
import { User } from '../../models/user.model'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

export class UsersTypeORMRepository implements UsersRepository {
  constructor(private readonly userRepository: Repository<User>) {}

  async update(id: string, user: User): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ id: +id })
    const isPasswordValid = await bcrypt.compare(user.password, existingUser.password)
    if (!isPasswordValid) throw new BadRequestException('Invalid password.')

    const hash = await bcrypt.hash(user.password, 10)
    await this.userRepository.update(id, { ...user, password: hash, updated_at: new Date() })
    return { ...existingUser, ...user }
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
