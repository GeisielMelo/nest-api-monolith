import { BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { cookiesConfig } from '../../../../../config/cookies.config'
import { User } from '../../../../users/domain/models/user.model'
import { AuthRepository } from '../auth.repository.interface'
import { SignInDto } from '../../../http/dtos/sign-in.dto'
import { SignUpDto } from '../../../http/dtos/sign-up.dto'
import { Token } from '../../models/token.model'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import { Response } from 'express'
import * as bcrypt from 'bcrypt'

export class AuthTypeORMRepository implements AuthRepository {
  private JWT_ACCESS_SECRET: string
  private JWT_REFRESH_SECRET: string

  constructor(
    private readonly userRepository: Repository<User>,
    private readonly tokenRepository: Repository<Token>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.JWT_ACCESS_SECRET = this.configService.get<string>('jwt.access')
    this.JWT_REFRESH_SECRET = this.configService.get<string>('jwt.refresh')
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const user = await this.userRepository.findOneBy({ email: signInDto.email })
    if (!user) throw new BadRequestException('This user does not exist.')

    const isPasswordValid = await bcrypt.compare(signInDto.password, user.password)
    if (!isPasswordValid) throw new BadRequestException('Invalid email or password.')

    return this.generateUserTokens(user, res)
  }

  async signUp(signUpDto: SignUpDto, res: Response) {
    const user = await this.userRepository.findOneBy({ email: signUpDto.email })
    if (user) throw new BadRequestException('User already exists.')

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10)
    const data = { ...signUpDto, password: hashedPassword, created_at: new Date(), updated_at: new Date() }
    const newUser = this.userRepository.create(data)
    await this.userRepository.save(newUser)

    return this.generateUserTokens(newUser, res)
  }

  private async generateUserTokens(user: User, res: Response) {
    try {
      const { id, email } = user
      const accessToken = this.jwtService.sign({ id, email }, { secret: this.JWT_ACCESS_SECRET, expiresIn: '12h' })
      const refreshToken = this.jwtService.sign({ id, email }, { secret: this.JWT_REFRESH_SECRET, expiresIn: '7 days' })

      await this.storeRefreshToken(id, refreshToken)

      res.cookie('access', accessToken, cookiesConfig.access)
      res.cookie('refresh', refreshToken, cookiesConfig.refresh)
      return res.send({ message: 'OK' })
    } catch (error) {
      throw new InternalServerErrorException('Error generating tokens')
    }
  }

  private async storeRefreshToken(id: number, token: string) {
    try {
      const data = { user_id: id, type: 'refresh', token, created_at: new Date(), updated_at: new Date() }
      const newToken = this.tokenRepository.create(data)
      await this.tokenRepository.save(newToken)
    } catch (error) {
      if (error) throw new InternalServerErrorException('Error generating tokens')
    }
  }
}
