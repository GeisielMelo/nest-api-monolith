import { cookiesConfig } from '../../../../../config/cookies.config'
import { User } from '../../../../users/domain/entities/user.entity'
import { AuthRepository } from '../auth.repository.interface'
import { SignIn } from '../../entities/sign-in.entity'
import { SignUp } from '../../entities/sign-up.entity'
import { Token } from '../../entities/token.entity'
import { JwtService } from '@nestjs/jwt'
import { randomUUID } from 'crypto'
import { Response } from 'express'
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'

interface ExtendedUser extends User {
  id: string
}

interface ExtendedToken extends Token {
  id: string
}

export class AuthInMemoryRepository implements AuthRepository {
  private users: ExtendedUser[] = []
  private tokens: ExtendedToken[] = []
  private jwtService: JwtService

  private JWT_ACCESS_SECRET: string
  private JWT_REFRESH_SECRET: string

  constructor(private readonly configService: ConfigService) {
    this.jwtService = new JwtService()
    this.JWT_ACCESS_SECRET = this.configService.get<string>('jwt.access')
    this.JWT_REFRESH_SECRET = this.configService.get<string>('jwt.refresh')
  }

  async signIn(signIn: SignIn, res: Response): Promise<Response> {
    const user = this.users.find((user) => user.email === signIn.email)
    if (!user) throw new Error('This user does not exist.')

    const isPasswordValid = await bcrypt.compare(signIn.password, user.password)
    if (!isPasswordValid) throw new Error('Invalid email or password.')
    return this.generateUserTokens(user, res)
  }

  async signUp(signUp: SignUp, res: Response): Promise<Response> {
    const user = this.users.find((user) => user.email === signUp.email)
    if (user) throw new Error('User already exists.')

    const hashedPassword = await bcrypt.hash(signUp.password, 10)
    const newUser = { ...signUp, id: randomUUID(), password: hashedPassword, created_at: new Date(), updated_at: new Date() }
    this.users.push(newUser)
    return this.generateUserTokens(newUser, res)
  }

  private async generateUserTokens(user: ExtendedUser, res: Response): Promise<Response> {
    const { id, email } = user
    const accessToken = this.jwtService.sign({ id, email }, { secret: this.JWT_ACCESS_SECRET, expiresIn: '12h' })
    const refreshToken = this.jwtService.sign({ id, email }, { secret: this.JWT_REFRESH_SECRET, expiresIn: '7 days' })

    await this.storeRefreshToken(id, refreshToken)

    res.cookie('access', accessToken, cookiesConfig.access)
    res.cookie('refresh', refreshToken, cookiesConfig.refresh)
    return res.send({ message: 'OK' })
  }

  private async storeRefreshToken(id: string, token: string) {
    const newToken = { id, type: 'refresh', token }
    this.tokens.push(newToken)
  }
}
