import { BaseEntity, Column, Entity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CommentLike extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'commentId', type: 'uuid' })
  commentId: string;

  @Column({ name: 'userId', type: 'uuid' })
  userId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
