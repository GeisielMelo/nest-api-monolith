import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { User } from '../../../users/domain/models/user.model'

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user_id: number

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  type: string

  @Column()
  token: string

  @Column({ type: 'timestamp' })
  created_at: Date

  @Column({ type: 'timestamp' })
  updated_at: Date
}
