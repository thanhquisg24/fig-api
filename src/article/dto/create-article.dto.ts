import { IsDefined, IsString } from 'class-validator';
export class CreateArticleDto {
  @IsDefined()
  @IsString()
  title: string;

  @IsDefined()
  @IsString()
  description: string;
}
