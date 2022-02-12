import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { TagsModule } from './tags/tags.module';
import { ResourcesModule } from './resources/resources.module';
import { Connection } from 'typeorm';
import { CommentLikesModule } from './comment-likes/comment-likes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      // Synchronize only for development phase not for prod
      synchronize: process.env.DB_SYNCHRONIZE === 'true'
      // migrations: ['src/migration/*{.ts,.js}']
    }),
    UsersModule,
    ProjectsModule,
    CardsModule,
    CommentsModule,
    TagsModule,
    ResourcesModule,
    CommentLikesModule
  ]
})
export class AppModule {
  constructor(private connection: Connection) {}
}
