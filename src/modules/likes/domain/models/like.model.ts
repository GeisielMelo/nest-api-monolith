import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { User } from '../../../users/domain/models/user.model'

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user_id: number

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  name: string

  @Column()
  type: string

  @Column({ type: 'bigint' })
  code: number

  @Column({ type: 'timestamp' })
  created_at: Date

  @Column({ type: 'timestamp' })
  updated_at: Date
}
