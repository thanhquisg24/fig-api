import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'article' })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ name: 'description', type: 'text' })
  description: string;
}
