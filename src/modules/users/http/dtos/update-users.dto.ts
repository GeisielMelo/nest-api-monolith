import { InputType, PartialType } from '@nestjs/graphql'
import { CreateUserDto } from './create-users.dto'

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {}
