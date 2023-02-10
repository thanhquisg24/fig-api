import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false, unique: true })
  email: string;

  @Column({ length: 255, nullable: false })
  password: string;

  @Column({ name: 'price', type: 'real', nullable: false, default: 0 })
  price: number;

  @Column({ name: 'total_amount', type: 'bigint', nullable: false, default: 0 })
  totalAmount: number;

  @Column({ name: 'locked', type: 'bigint', nullable: false, default: 0 })
  locked: number;

  @Column({ name: 'avaiable', type: 'bigint', nullable: false, default: 0 })
  avaiable: number;

  @Column({ name: 'claimed', type: 'bigint', nullable: false, default: 0 })
  claimed: number;

  @Column({ name: 'start_date', type: 'timestamptz', nullable: false })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamptz', nullable: false })
  endDate: Date;

  @Column({ name: 'vesting_logic', length: 255, nullable: false })
  vestingLogic: string;

  @Column({ name: 'refreshtoken', length: 255, nullable: true })
  refreshtoken: string;

  @Column({ name: 'refreshtokenexpires', length: 255, nullable: true })
  refreshtokenexpires: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
