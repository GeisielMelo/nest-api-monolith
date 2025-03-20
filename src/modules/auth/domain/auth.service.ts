import { AUTH_REPOSITORY_TOKEN, AuthRepository } from './repositories/auth.repository.interface'
import { RefreshTokenDto } from '../http/dtos/refresh-token.dto'
import { SignUpDto } from '../http/dtos/sign-up.dto'
import { SignInDto } from '../http/dtos/sign-in.dto'
import { Inject, Injectable } from '@nestjs/common'
import { Response } from 'express'

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: AuthRepository,
  ) {}

  async signIn(signInDto: SignInDto, response: Response) {
    return await this.authRepository.signIn(signInDto, response)
  }

  async signUp(signUpDto: SignUpDto, response: Response) {
    return await this.authRepository.signUp(signUpDto, response)
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    return await this.authRepository.refresh(refreshTokenDto.refreshToken)
  }
}
