import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { Field, InputType, ObjectType } from '@nestjs/graphql'

@InputType()
export class CreateUserDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  readonly email: string


  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly password: string
}

@ObjectType()
export class UserOutput {
  @Field(() => String)
  readonly name: string

  @Field(() => String)
  readonly email: string

  @Field(() => String)
  readonly password: string
}
