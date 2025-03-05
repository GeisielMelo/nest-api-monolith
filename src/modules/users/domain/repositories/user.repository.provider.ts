import { UsersInMemoryRepository } from './implementations/users.in-memory.repository'
import { UsersTypeORMRepository } from './implementations/users.typeorm.repository'
import { DataSource } from '../../../../common/constants/datasource-typeorm'
import { USERS_REPOSITORY_TOKEN } from './user.repository.interface'
import { Injectable, Provider } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { User } from '../models/user.model'
import { Repository } from 'typeorm'

export function provideUsersRepository(): Provider[] {
  return [
    {
      provide: USERS_REPOSITORY_TOKEN,
      useFactory: async (dependenciesProvider: UsersRepoDependenciesProvider) => provideUsersRepositoryFactory(dependenciesProvider),
      inject: [UsersRepoDependenciesProvider],
    },
    UsersRepoDependenciesProvider,
  ]
}

async function provideUsersRepositoryFactory(dependenciesProvider: UsersRepoDependenciesProvider) {
  await ConfigModule.envVariablesLoaded
  switch (process.env.DATABASE_SOURCE) {
    case DataSource.MYSQL:
      return new UsersTypeORMRepository(dependenciesProvider.typeOrmRepository)
    case DataSource.MEMORY:
      return new UsersInMemoryRepository()
    default:
      return new UsersInMemoryRepository()
  }
}

@Injectable()
export class UsersRepoDependenciesProvider {
  constructor(
    @InjectRepository(User)
    public typeOrmRepository: Repository<User>,
  ) {}
}
