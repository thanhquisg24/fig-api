import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReceivedTokenScheduleService } from './received_token_schedule.service';
import { CreateReceivedTokenScheduleDto } from './dto/create-received_token_schedule.dto';
import { UpdateReceivedTokenScheduleDto } from './dto/update-received_token_schedule.dto';

@Controller('received-token-schedule')
export class ReceivedTokenScheduleController {
  constructor(
    private readonly receivedTokenScheduleService: ReceivedTokenScheduleService,
  ) {}

  @Post()
  create(
    @Body() createReceivedTokenScheduleDto: CreateReceivedTokenScheduleDto,
  ) {
    return this.receivedTokenScheduleService.create(
      createReceivedTokenScheduleDto,
    );
  }

  @Get()
  findAll() {
    return this.receivedTokenScheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receivedTokenScheduleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReceivedTokenScheduleDto: UpdateReceivedTokenScheduleDto,
  ) {
    return this.receivedTokenScheduleService.update(
      +id,
      updateReceivedTokenScheduleDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receivedTokenScheduleService.remove(+id);
  }
}
