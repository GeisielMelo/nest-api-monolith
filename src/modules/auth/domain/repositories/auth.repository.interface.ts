import { SignIn } from '../entities/sign-in.entity'
import { SignUp } from '../entities/sign-up.entity'
import { Response } from 'express'

export interface AuthRepository {
  signIn(signIn: SignIn, response: Response): Promise<Response>
  signUp(signUp: SignUp, response: Response): Promise<Response>
  refresh(refreshToken: string): Promise<{ access: string }>
}

export const AUTH_REPOSITORY_TOKEN = 'AUTH_REPOSITORY_TOKEN'
