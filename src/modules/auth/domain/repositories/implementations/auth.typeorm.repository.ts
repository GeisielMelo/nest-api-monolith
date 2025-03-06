import { SignInDto } from 'src/modules/auth/http/dtos/sign-in.dto'
import { SignUpDto } from 'src/modules/auth/http/dtos/sign-up.dto'
import { User } from 'src/modules/users/domain/models/user.model'
import { AuthRepository } from '../auth.repository.interface'
import { BadRequestException } from '@nestjs/common'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

export class AuthTypeORMRepository implements AuthRepository {
  constructor(private readonly userRepository: Repository<User>) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOneBy({ email: signInDto.email })
    if (!user) throw new BadRequestException('Invalid email')

    const isPasswordValid = await bcrypt.compare(signInDto.password, user.password)
    if (!isPasswordValid) throw new BadRequestException('Invalid password')
    return user
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.userRepository.findOneBy({ email: signUpDto.email })
    if (user) throw new BadRequestException('User already exists')

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10)
    const data = { ...signUpDto, password: hashedPassword, created_at: new Date(), updated_at: new Date() }
    const newUser = this.userRepository.create(data)
    await this.userRepository.save(newUser)
    return newUser
  }
}
