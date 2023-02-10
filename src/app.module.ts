import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ReceivedTokenScheduleModule } from './modules/received_token_schedule/received_token_schedule.module';
import { TokenModule } from './modules/token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { VesingHistoryModule } from './modules/vesing-history/vesing-history.module';
import { VestingAddressModule } from './modules/vesting-address/vesting-address.module';
import { typeOrmAsyncConfig } from './config/typeorm.config';

// import entities from './config/typeorm.entities';

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
    AuthModule,
    ArticleModule,
    UserModule,
    TokenModule,
    VesingHistoryModule,
    VestingAddressModule,
    ReceivedTokenScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
