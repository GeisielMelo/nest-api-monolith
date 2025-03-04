import { CreateUserDto } from '../http/dtos/create-users.dto'
import { UpdateUserDto } from '../http/dtos/update-users.dto'
import { USERS_REPOSITORY_TOKEN, UsersRepository } from './repositories/user.repository.interface'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly userRepository: UsersRepository,
  ) {}

  async create(userDto: CreateUserDto) {
    return await this.userRepository.create(userDto)
  }

  async findById(id: string) {
    return await this.userRepository.findById(id)
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email)
  }

  async findAll() {
    return await this.userRepository.findAll()
  }

  async update(id: string, userDto: UpdateUserDto) {
    return await this.userRepository.update(id, userDto)
  }

  async delete(id: string) {
    return await this.userRepository.delete(id)
  }
}
