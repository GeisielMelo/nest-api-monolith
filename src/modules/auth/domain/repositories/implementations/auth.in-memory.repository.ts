import { User } from 'src/modules/users/domain/entities/user.entity'
import { AuthRepository } from '../auth.repository.interface'
import { SignIn } from '../../entities/sign-in.entity'
import { SignUp } from '../../entities/sign-up.entity'
import { randomUUID } from 'crypto'
import * as bcrypt from 'bcrypt'

interface UserWithId extends User {
  id?: string
  created_at?: Date
  updated_at?: Date
}

export class AuthInMemoryRepository implements AuthRepository {
  private users: UserWithId[] = []

  async signIn(signIn: SignIn): Promise<User | null> {
    const user = this.users.find((user) => user.email === signIn.email)
    if (!user) return null

    const isPasswordValid = await bcrypt.compare(signIn.password, user.password)
    if (!isPasswordValid) return null

    return user
  }

  async signUp(signUp: SignUp): Promise<User> {
    const user = this.users.find((user) => user.email === signUp.email)
    if (user) throw new Error('User already exists')

    const hashedPassword = await bcrypt.hash(signUp.password, 10)
    const newUser = { ...signUp, id: randomUUID(), password: hashedPassword, created_at: new Date(), updated_at: new Date() }
    this.users.push(newUser)
    return newUser
  }
}
