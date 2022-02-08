import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Project } from './projects/project.entity';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    // Setup environment variables
    // Research how db migrations work for typeorm
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'reqord',
      password: 'p@ssw0rd',
      database: 'reqord',
      entities: [Project],
      autoLoadEntities: true,
      // migrationsRun: true
      // synchronize: true, // should not be used in production
    }),
    ProjectsModule
  ]
})
export class AppModule {
  constructor(private connection: Connection) {}
}
