import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmailTidy,
  IsStringDate,
  IsNotBlankString,
  IsPositiveInt,
  IntMinMax,
} from '@nestjsi/class-validator';
import { IsPrice } from '@nestjsi/class-validator/is/is-price';

const MAX_ALLOW_INT = 10000000000;
export class CreateUserDto {
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
  @IntMinMax(0, MAX_ALLOW_INT)
  @IsPositiveInt()
  locked: number;

  @ApiProperty({
    required: true,
  })
  @IntMinMax(0, MAX_ALLOW_INT)
  avaiable: number;

  @ApiProperty({
    required: true,
  })
  @IntMinMax(0, MAX_ALLOW_INT)
  claimed: number;

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
