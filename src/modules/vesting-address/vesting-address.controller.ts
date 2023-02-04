import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VestingAddressService } from './vesting-address.service';
import { CreateVestingAddressDto } from './dto/create-vesting-address.dto';
import { UpdateVestingAddressDto } from './dto/update-vesting-address.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('vesting-address')
@Controller('api/v1/vesing-address')
@ApiTags('Vesting address APIs')
export class VestingAddressController {
  constructor(private readonly vestingAddressService: VestingAddressService) {}

  @Post()
  create(@Body() createVestingAddressDto: CreateVestingAddressDto) {
    return this.vestingAddressService.create(createVestingAddressDto);
  }

  @Get()
  findAll() {
    return this.vestingAddressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vestingAddressService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVestingAddressDto: UpdateVestingAddressDto,
  ) {
    return this.vestingAddressService.update(+id, updateVestingAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vestingAddressService.remove(+id);
  }
}
