import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from '../domain/auth.service'
import { SignUpDto } from './dtos/sign-up.dto'
import { SignInDto } from './dtos/sign-in.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto)
  }
}
