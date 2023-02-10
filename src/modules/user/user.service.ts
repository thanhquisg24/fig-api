import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { encryptWithAES } from 'src/common/utils/hash-util';
import { GenInitUserDto } from './dto/gen-init-user.dto';
import { Transactional } from 'typeorm-transactional';
import { ReceivedTokenScheduleService } from '../received_token_schedule/received_token_schedule.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
    private readonly receivedTokenScheduleService: ReceivedTokenScheduleService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const oldUser = await this.repo.findOneBy({
      email: createUserDto.email,
    });
    if (oldUser) {
      throw new BadRequestException('This Email is already exist!');
    }
    const createUserDtoWithHashPass = createUserDto;
    createUserDtoWithHashPass.password = encryptWithAES(
      createUserDtoWithHashPass.password,
    );
    createUserDtoWithHashPass.locked = createUserDtoWithHashPass.totalAmount;
    return await this.repo.save(createUserDtoWithHashPass);
  }

  @Transactional()
  async createAndGenSchedule(genUser: GenInitUserDto) {
    const newUser = await this.create(genUser as CreateUserDto);
    this.receivedTokenScheduleService.genAndSaveSchedule(
      newUser.id,
      newUser.totalAmount,
      newUser.startDate,
      newUser.endDate,
      newUser.vestingLogic,
    );
    return newUser;
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.repo.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.repo
      .findOneBy({
        email,
      })
      .then((entity) => {
        if (!entity) {
          return Promise.reject(new NotFoundException('Model not found'));
        }

        return Promise.resolve(entity || null);
      });
  }

  async saveorupdateRefreshToken(
    refreshToken: string,
    id: number,
    refreshtokenexpires,
  ) {
    await this.repo.update(id, {
      refreshtoken: refreshToken,
      refreshtokenexpires,
    });
  }
}
