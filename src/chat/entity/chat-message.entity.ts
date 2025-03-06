import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('chat_message')
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender: string;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn({ name: 'createdat' })
  createdAt: Date;
}
