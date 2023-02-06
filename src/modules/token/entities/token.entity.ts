import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'token' })
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'token_address', length: 255, nullable: false, unique: true })
  tokenAddress: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}