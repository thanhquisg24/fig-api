import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import entities from './typeorm.entities';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      entities,
      migrationsTableName: 'migrations',
      migrations: [
        'src/database/migrations/*.ts',
        // path.resolve(`${__dirname}/../../database/migrations/*{.ts,.js}`),
      ],
      //   cli: {
      //     migrationsDir: __dirname + '/../database/migrations',
      //   },
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: true,
      logging: true,
      logger: 'file',
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities,
  migrationsTableName: 'migrations',
  migrations: [`src/database/migrations/*{.ts,.js}`],
  //   cli: {
  //     migrationsDir: __dirname + '/../database/migrations',
  //   },
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: true,
  logger: 'file',
};
