import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { User } from 'src/modules/users/domain/models/users.model';
import { UsersModule } from '../modules/users/users.module'
import { ConfigModule, ConfigType } from '@nestjs/config'
import databaseConfig from '../config/database.config';
import { AppController } from './app.controller'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    UsersModule,
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
        entities: [User],
        synchronize: true,
      }),
      inject: [databaseConfig.KEY],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
