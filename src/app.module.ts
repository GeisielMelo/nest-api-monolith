import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        database: 'TmdbCatalogueDB',
        url: configService.get<string>('MONGODB_URI'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
        authSource: 'admin',
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
})
export class AppModule {}
