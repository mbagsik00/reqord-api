import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description?: string;

  @Column({ name: 'status', type: 'varchar', nullable: true })
  status?: string;

  @Column({ name: 'repository_link', type: 'varchar', nullable: true })
  repositoryLink?: string;

  @Column({ name: 'tags', type: 'simple-array', default: [] })
  tags: string[];

  @Column({ name: 'cards', type: 'simple-array', default: [] })
  cards: string[];

  @Column({ name: 'comments', type: 'simple-array', default: [] })
  comments: string[];

  @Column({ name: 'members', type: 'simple-array', default: [] })
  members: string[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ name: 'updated_by', type: 'uuid' })
  updatedBy: string;
}
