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

  @Column({ name: 'price', type: 'real', nullable: false })
  price: number;

  @Column({ name: 'total_amount', type: 'bigint', nullable: false })
  totalAmount: number;

  @Column({ name: 'locked', type: 'bigint', nullable: false })
  locked: number;

  @Column({ name: 'avaiable', type: 'bigint', nullable: false })
  avaiable: number;

  @Column({ name: 'claimed', type: 'bigint', nullable: false })
  claimed: number;

  @Column({ name: 'start_date', type: 'timestamp', nullable: false })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp', nullable: false })
  endDate: Date;

  @Column({ name: 'vesting_logic', length: 255, nullable: false })
  vestingLogic: string;

  @Column({ name: 'refreshtoken', length: 255, nullable: true })
  refreshtoken: string;

  @Column({ name: 'refreshtokenexpires', length: 255, nullable: true })
  refreshtokenexpires: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
