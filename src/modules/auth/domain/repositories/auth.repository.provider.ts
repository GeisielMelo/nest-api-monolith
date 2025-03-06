import { AuthInMemoryRepository } from './implementations/auth.in-memory.repository'
import { AuthTypeORMRepository } from './implementations/auth.typeorm.repository'
import { DataSource } from '../../../../common/constants/datasource-typeorm'
import { AUTH_REPOSITORY_TOKEN } from './auth.repository.interface'
import { User } from 'src/modules/users/domain/models/user.model'
import { Injectable, Provider } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
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
      return new AuthTypeORMRepository(dependenciesProvider.typeOrmRepository)
    case DataSource.MEMORY:
      return new AuthInMemoryRepository()
    default:
      return new AuthInMemoryRepository()
  }
}

@Injectable()
export class AuthRepoDependenciesProvider {
  constructor(
    @InjectRepository(User)
    public typeOrmRepository: Repository<User>,
  ) {}
}
