import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  Generated,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('Address')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid') // Generates a UUID for each record
  publicId: string;

  @Column() // Explicitly defining the userId field
  userId: number;

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) // Links the userId column to the User entity
  user: User;

  @Column({ length: 255 })
  addressLine1: string;

  @Column({ length: 255, nullable: true })
  addressLine2: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  state: string;

  @Column({ length: 20 })
  postalCode: string;

  @Column({ length: 100 })
  country: string;

  @Column({ type: 'enum', enum: ['billing', 'shipping'] })
  addressType: string;

  @CreateDateColumn()
  createdAt: Date;
}
