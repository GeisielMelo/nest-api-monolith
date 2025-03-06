import { Body, Controller, Delete, Param, Put } from '@nestjs/common'
import { UsersService } from '../domain/users.service'
import { UpdateUserDto } from './dtos/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
    return this.usersService.update(id, userDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
