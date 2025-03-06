import { USERS_REPOSITORY_TOKEN, UsersRepository } from './repositories/user.repository.interface'
import { UpdateUserDto } from '../http/dtos/update-user.dto'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly userRepository: UsersRepository,
  ) {}

  async update(id: string, userDto: UpdateUserDto) {
    return await this.userRepository.update(id, userDto)
  }

  async remove(id: string) {
    return await this.userRepository.remove(id)
  }
}
