import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Project level comment
  @Column({ name: 'project_id', type: 'uuid' })
  projectId: string;

  // Card level comment
  @Column({ name: 'card_id', type: 'uuid', nullable: true })
  cardId?: string;

  // For replying in a comment
  @Column({ name: 'comment_id', type: 'uuid', nullable: true })
  commentId?: string;

  @Column({ name: 'comment', type: 'varchar' })
  comment: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ name: 'updated_by', type: 'uuid' })
  updatedBy: string;
}
