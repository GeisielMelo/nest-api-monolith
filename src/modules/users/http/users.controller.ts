import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UsersService } from '../domain/users.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { User } from '../domain/entities/user.entity'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto)
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: CreateUserDto) {
    return this.usersService.update(id, userDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
