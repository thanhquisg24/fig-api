import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVestingAddressDto } from './dto/create-vesting-address.dto';
import { UpdateVestingAddressDto } from './dto/update-vesting-address.dto';
import { VestingAddressEntity } from './entities/vesting-address.entity';

@Injectable()
export class VestingAddressService {
  constructor(
    @InjectRepository(VestingAddressEntity)
    private readonly repo: Repository<VestingAddressEntity>,
  ) {}
  async create(createVestingAddressDto: CreateVestingAddressDto) {
    return await this.repo.save(createVestingAddressDto);
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

  async update(id: number, updateVestingAddressDto: UpdateVestingAddressDto) {
    return await this.repo.update(id, updateVestingAddressDto);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
