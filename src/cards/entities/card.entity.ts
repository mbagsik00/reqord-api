import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';

@Entity()
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description?: string;

  @Column({ name: 'type', type: 'varchar' })
  type: string;

  @Column({ name: 'status', type: 'varchar', nullable: true })
  status?: string;

  @Column({ name: 'data', type: 'json', default: {} })
  data: any;

  @Column({ name: 'tags', type: 'simple-array', default: [] })
  tags: string[];

  @Column({ name: 'cards', type: 'simple-array', default: [] })
  cards: string[];

  @Column({ name: 'comments', type: 'simple-array', default: [] })
  comments: string[];

  @Column({ name: 'resource_links', type: 'simple-array', default: [] })
  resourceLinks: string[];

  @Column({ name: 'contributors', type: 'simple-array', default: [] })
  contributors: string[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'createdBy', type: 'uuid' })
  createdBy: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ name: 'updatedBy', type: 'uuid' })
  updatedBy: string;
}
