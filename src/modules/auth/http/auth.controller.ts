import { Body, Controller, Post, Res } from '@nestjs/common'
import { RefreshTokenDto } from './dtos/refresh-token.dto'
import { AuthService } from '../domain/auth.service'
import { SignUpDto } from './dtos/sign-up.dto'
import { SignInDto } from './dtos/sign-in.dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto, @Res() response: Response) {
    return this.authService.signIn(signInDto, response)
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto, @Res() response: Response) {
    return this.authService.signUp(signUpDto, response)
  }

  @Post('refresh')
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refresh(refreshTokenDto)
  }
}
