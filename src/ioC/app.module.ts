import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { User } from '../modules/users/domain/models/user.model'
import { Like } from '../modules/likes/domain/models/like.model'
import { UsersModule } from '../modules/users/users.module'
import { LikesModule } from '../modules/likes/likes.module'
import { AuthModule } from '../modules/auth/auth.module'
import { ConfigModule, ConfigType } from '@nestjs/config'
import databaseConfig from '../config/database.config'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    UsersModule,
    LikesModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ load: [databaseConfig] })],
      useFactory: (configDatabase: ConfigType<typeof databaseConfig>): TypeOrmModuleOptions => ({
        type: 'mysql',
        host: configDatabase.host,
        port: configDatabase.port,
        username: configDatabase.username,
        password: configDatabase.password,
        database: configDatabase.database,
        entities: [User, Like],
        synchronize: true,
      }),
      inject: [databaseConfig.KEY],
    }),
  ],
})
export class AppModule {}
