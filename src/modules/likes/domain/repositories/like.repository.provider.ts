import { LikesInMemoryRepository } from './implementations/likes.in-memory.repository'
import { LikesTypeORMRepository } from './implementations/likes.typeorm.repository'
import { DataSource } from '../../../../common/constants/datasource-typeorm'
import { LIKES_REPOSITORY_TOKEN } from './like.repository.interface'
import { Injectable, Provider } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { Like } from '../models/like.model'
import { Repository } from 'typeorm'

export function provideLikesRepository(): Provider[] {
  return [
    {
      provide: LIKES_REPOSITORY_TOKEN,
      useFactory: async (dependenciesProvider: LikesRepoDependenciesProvider) => provideLikesRepositoryFactory(dependenciesProvider),
      inject: [LikesRepoDependenciesProvider],
    },
    LikesRepoDependenciesProvider,
  ]
}

async function provideLikesRepositoryFactory(dependenciesProvider: LikesRepoDependenciesProvider) {
  await ConfigModule.envVariablesLoaded
  switch (process.env.DATABASE_SOURCE) {
    case DataSource.MYSQL:
      return new LikesTypeORMRepository(dependenciesProvider.typeOrmRepository)
    case DataSource.MEMORY:
      return new LikesInMemoryRepository()
    default:
      return new LikesInMemoryRepository()
  }
}

@Injectable()
export class LikesRepoDependenciesProvider {
  constructor(
    @InjectRepository(Like)
    public typeOrmRepository: Repository<Like>,
  ) {}
}
