import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'vesting_address' })
export class VestingAddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'address', length: 255, nullable: false, unique: true })
  address: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
