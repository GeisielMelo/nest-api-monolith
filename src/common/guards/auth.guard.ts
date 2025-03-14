import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { DataSource } from '../constants/datasource-typeorm'

@Injectable()
export class AuthGuard implements CanActivate {
  private JWT_ACCESS_SECRET: string

  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.JWT_ACCESS_SECRET = this.configService.get<string>('jwt.access')
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const { authorization } = request.headers

    if (!authorization || authorization.trim() === '') {
      throw new UnauthorizedException('Authorization token is missing.')
    }

    try {
      const authToken = authorization.replace(/bearer/gim, '').trim()
      const decoded = this.jwtService.verify(authToken, { secret: this.JWT_ACCESS_SECRET })

      const userIdFromToken = decoded.id
      const userIdFromParams = request.params.id

      if (String(userIdFromToken) !== String(userIdFromParams)) throw Error()
    } catch (error) {
      throw new ForbiddenException('Invalid authorization token.')
    }

    return true
  }
}
