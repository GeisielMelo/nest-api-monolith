import { User } from '../../../../users/domain/entities/user.entity'
import { AuthRepository } from '../auth.repository.interface'
import { SignIn } from '../../entities/sign-in.entity'
import { SignUp } from '../../entities/sign-up.entity'
import { Token } from '../../entities/token.entity'
import { JwtService } from '@nestjs/jwt'
import { randomUUID } from 'crypto'
import * as bcrypt from 'bcrypt'

interface ExtendedUser extends User {
  id: string
}

interface ExtendedToken extends Token {
  id: string
}

interface AccessTokens {
  access: string
  refresh: string
}

export class AuthInMemoryRepository implements AuthRepository {
  private users: ExtendedUser[] = []
  private tokens: ExtendedToken[] = []
  private jwtService: JwtService

  constructor() {
    this.jwtService = new JwtService()
  }

  async signIn(signIn: SignIn): Promise<AccessTokens> {
    const user = this.users.find((user) => user.email === signIn.email)
    if (!user) throw new Error('User not found')

    const isPasswordValid = await bcrypt.compare(signIn.password, user.password)
    if (!isPasswordValid) throw new Error('Invalid Password')

    return await this.generateUserTokens(user)
  }

  async signUp(signUp: SignUp): Promise<AccessTokens> {
    const user = this.users.find((user) => user.email === signUp.email)
    if (user) throw new Error('User already exists')

    const hashedPassword = await bcrypt.hash(signUp.password, 10)
    const newUser = { ...signUp, id: randomUUID(), password: hashedPassword, created_at: new Date(), updated_at: new Date() }
    this.users.push(newUser)
    return await this.generateUserTokens(newUser)
  }

  private async generateUserTokens(user: ExtendedUser): Promise<AccessTokens> {
    const { id, email } = user
    const accessToken = this.jwtService.sign({ id, email }, { secret: 'TEST_SECRET', expiresIn: '12h' })
    const refreshToken = this.jwtService.sign({ id, email }, { secret: 'TEST_SECRET', expiresIn: '7 days' })

    await this.storeRefreshToken(id, refreshToken)
    return { access: accessToken, refresh: refreshToken }
  }

  private async storeRefreshToken(id: string, token: string) {
    const newToken = { id, type: 'refresh', token }
    this.tokens.push(newToken)
  }
}
