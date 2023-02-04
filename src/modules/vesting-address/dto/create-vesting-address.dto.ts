import { ApiProperty } from '@nestjs/swagger';
import { IsNotBlankString } from '@nestjsi/class-validator';

export class CreateVestingAddressDto {
  @ApiProperty({
    required: true,
  })
  @IsNotBlankString()
  address: string;
}
