import { AUTH_REPOSITORY_TOKEN, AuthRepository } from './repositories/auth.repository.interface'
import { SignUpDto } from '../http/dtos/sign-up.dto'
import { SignInDto } from '../http/dtos/sign-in.dto'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: AuthRepository,
  ) {}

  async signIn(signInDto: SignInDto) {
    return await this.authRepository.signIn(signInDto)
  }

  async signUp(signUpDto: SignUpDto) {
    return await this.authRepository.signUp(signUpDto)
  }
}
