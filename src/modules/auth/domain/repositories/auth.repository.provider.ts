import { AuthInMemoryRepository } from './implementations/auth.in-memory.repository'
import { AuthTypeORMRepository } from './implementations/auth.typeorm.repository'
import { DataSource } from '../../../../common/constants/datasource-typeorm'
import { User } from '../../../../modules/users/domain/models/user.model'
import { AUTH_REPOSITORY_TOKEN } from './auth.repository.interface'
import { Injectable, Provider } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { ConfigModule } from '@nestjs/config'
import { Token } from '../models/token.model'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'


export function provideAuthRepository(): Provider[] {
  return [
    {
      provide: AUTH_REPOSITORY_TOKEN,
      useFactory: async (dependenciesProvider: AuthRepoDependenciesProvider) => provideAuthRepositoryFactory(dependenciesProvider),
      inject: [AuthRepoDependenciesProvider],
    },
    AuthRepoDependenciesProvider,
  ]
}

async function provideAuthRepositoryFactory(dependenciesProvider: AuthRepoDependenciesProvider) {
  await ConfigModule.envVariablesLoaded
  switch (process.env.DATABASE_SOURCE) {
    case DataSource.MYSQL:
      return new AuthTypeORMRepository(
        dependenciesProvider.typeOrmRepository,
        dependenciesProvider.tokenRepository,
        dependenciesProvider.jwtService,
        dependenciesProvider.configService,
      )
    case DataSource.MEMORY:
      return new AuthInMemoryRepository(dependenciesProvider.configService)
    default:
      return new AuthInMemoryRepository(dependenciesProvider.configService)
  }
}

@Injectable()
export class AuthRepoDependenciesProvider {
  constructor(
    @InjectRepository(User)
    public typeOrmRepository: Repository<User>,
    @InjectRepository(Token)
    public tokenRepository: Repository<Token>,
    public jwtService: JwtService,
    public configService: ConfigService,
  ) {}
}
