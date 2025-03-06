import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsEmail()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  readonly password: string
}
