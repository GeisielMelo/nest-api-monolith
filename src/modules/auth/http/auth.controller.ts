import { Body, Controller, Post, Res } from '@nestjs/common'
import { AuthService } from '../domain/auth.service'
import { SignUpDto } from './dtos/sign-up.dto'
import { SignInDto } from './dtos/sign-in.dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    return this.authService.signIn(signInDto, res)
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    return this.authService.signUp(signUpDto, res)
  }
}
