import { BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { User } from '../../../../users/domain/models/user.model'
import { AuthRepository } from '../auth.repository.interface'
import { SignInDto } from '../../../http/dtos/sign-in.dto'
import { SignUpDto } from '../../../http/dtos/sign-up.dto'
import { Token } from '../../models/token.model'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
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
    this.JWT_REFRESH_SECRET = this.configService.get<string>('jwt.secret')
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOneBy({ email: signInDto.email })
    if (!user) throw new BadRequestException('Invalid email')

    const isPasswordValid = await bcrypt.compare(signInDto.password, user.password)
    if (!isPasswordValid) throw new BadRequestException('Invalid password')

    return this.generateUserTokens(user)
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.userRepository.findOneBy({ email: signUpDto.email })
    if (user) throw new BadRequestException('User already exists')

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10)
    const data = { ...signUpDto, password: hashedPassword, created_at: new Date(), updated_at: new Date() }
    const newUser = this.userRepository.create(data)
    await this.userRepository.save(newUser)

    return this.generateUserTokens(newUser)
  }

  async generateUserTokens(user: User) {
    try {
      const { id, email } = user
      const accessToken = this.jwtService.sign({ id, email }, { secret: this.JWT_ACCESS_SECRET, expiresIn: '12h' })
      const refreshToken = this.jwtService.sign({ id, email }, { secret: this.JWT_REFRESH_SECRET, expiresIn: '7 days' })

      await this.storeRefreshToken(id, refreshToken)
      return { access: accessToken, refresh: refreshToken }
    } catch (error) {
      if (error) throw new InternalServerErrorException('Error generating tokens')
    }
  }

  async storeRefreshToken(id: number, token: string) {
    try {
      const newToken = this.tokenRepository.create({ user_id: id, token })
      await this.tokenRepository.save(newToken)
    } catch (error) {
      if (error) throw new InternalServerErrorException('Error generating tokens')
    }
  }
}
