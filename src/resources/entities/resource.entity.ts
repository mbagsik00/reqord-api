import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';

export enum ResourceType {
  LINK = 'Link'
}

@Entity()
export class Resource extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'type', type: 'varchar' })
  type: string;

  @Column({ name: 'resource', type: 'varchar' })
  resource: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ name: 'updated_by', type: 'uuid' })
  updatedBy: string;
}
