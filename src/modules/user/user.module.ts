import { Module } from '@nestjs/common';
import { ReceivedTokenScheduleEntity } from '../received_token_schedule/entities/received_token_schedule.entity';
import { ReceivedTokenScheduleService } from '../received_token_schedule/received_token_schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ReceivedTokenScheduleEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, ReceivedTokenScheduleService],
})
export class UserModule {}
