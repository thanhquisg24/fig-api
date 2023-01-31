import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepo: Repository<ArticleEntity>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    return await this.articleRepo.save(createArticleDto);
  }

  async findAll() {
    return await this.articleRepo.find();
  }

  async findOne(id: number) {
    return await this.articleRepo.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    return await this.articleRepo.update(id, updateArticleDto);
  }

  async remove(id: number) {
    return await this.articleRepo.delete(id);
  }
}
