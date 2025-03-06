import { SignIn } from '../entities/sign-in.entity'
import { SignUp } from '../entities/sign-up.entity'

export interface AuthRepository {
  signIn(signIn: SignIn): Promise<any>
  signUp(signUp: SignUp): Promise<any>
}

export const AUTH_REPOSITORY_TOKEN = 'AUTH_REPOSITORY_TOKEN'
