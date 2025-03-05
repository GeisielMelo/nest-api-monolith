import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateLikeDto {
  @IsNumber()
  @IsNotEmpty()
  readonly user_id: number

  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly type: string

  @IsNumber()
  @IsNotEmpty()
  readonly code: number
}
