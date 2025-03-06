import { SignIn } from '../entities/sign-in.entity'
import { SignUp } from '../entities/sign-up.entity'
import { Response } from 'express'

export interface AuthRepository {
  signIn(signIn: SignIn, res: Response): Promise<Response>
  signUp(signUp: SignUp, res: Response): Promise<Response>
}

export const AUTH_REPOSITORY_TOKEN = 'AUTH_REPOSITORY_TOKEN'
