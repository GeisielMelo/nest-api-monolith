import { USERS_REPOSITORY_TOKEN, UsersRepository } from './repositories/user.repository.interface'
import { CreateUserDto } from '../http/dtos/create-user.dto'
import { UpdateUserDto } from '../http/dtos/update-user.dto'
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

  async remove(id: string) {
    return await this.userRepository.remove(id)
  }
}
