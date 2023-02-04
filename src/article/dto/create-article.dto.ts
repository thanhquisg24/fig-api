import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
export class CreateArticleDto {
  @IsDefined()
  @IsString()
  @ApiProperty({
    required: true,
    description: 'title',
  })
  title: string;

  @IsDefined()
  @IsString()
  @ApiProperty({
    required: true,
    description: 'description',
  })
  description: string;
}
