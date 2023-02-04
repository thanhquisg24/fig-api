import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
// import entities from './config/typeorm.entities';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { TokenModule } from './modules/token/token.module';
import { VestingAddressModule } from './modules/vesting-address/vesting-address.module';
import { VesingHistoryModule } from './modules/vesing-history/vesing-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'soldier001',
    //   database: 'nestjs',
    //   entities,
    //   // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    //   dropSchema: false,
    // }),
    // TaskModule,
    ArticleModule,
    UserModule,
    TokenModule,
    VesingHistoryModule,
    VestingAddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
