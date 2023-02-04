import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VesingHistoryService } from './vesing-history.service';
import { CreateVesingHistoryDto } from './dto/create-vesing-history.dto';
import { UpdateVesingHistoryDto } from './dto/update-vesing-history.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/v1/vesing-history')
@ApiTags('Vesting history APIs')
export class VesingHistoryController {
  constructor(private readonly vesingHistoryService: VesingHistoryService) {}

  @Post()
  create(@Body() createVesingHistoryDto: CreateVesingHistoryDto) {
    return this.vesingHistoryService.create(createVesingHistoryDto);
  }

  @Get()
  findAll() {
    return this.vesingHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vesingHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVesingHistoryDto: UpdateVesingHistoryDto,
  ) {
    return this.vesingHistoryService.update(+id, updateVesingHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vesingHistoryService.remove(+id);
  }
}
