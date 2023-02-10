import {
  IntMinMax,
  IsEmailTidy,
  IsNotBlankString,
  IsStringDate,
} from '@nestjsi/class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IsPrice } from '@nestjsi/class-validator/is/is-price';
import { MAX_ALLOW_INT } from 'src/common/constants';

export class GenInitUserDto {
  @ApiProperty({
    required: true,
  })
  @IsEmailTidy()
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsNotBlankString()
  password: string;

  @ApiProperty({
    required: true,
  })
  @IsPrice()
  price: number;

  @ApiProperty({
    required: true,
  })
  @IntMinMax(0, MAX_ALLOW_INT)
  totalAmount: number;

  @ApiProperty({
    required: true,
  })
  @IsStringDate()
  startDate: Date;

  @ApiProperty({
    required: true,
  })
  @IsStringDate()
  endDate: Date;

  @ApiProperty({
    required: true,
  })
  @IsNotBlankString()
  vestingLogic: string;
}
