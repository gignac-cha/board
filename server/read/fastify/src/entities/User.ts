import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from './Article';
import { Comment } from './Comment';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ unique: true })
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ name: 'unique_id', unique: true })
  uniqueId: string;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @UpdateDateColumn({ name: 'last_signed_at' })
  lastSignedAt: Date;

  @OneToMany(() => Article, (article: Article) => article.createdBy, {
    lazy: true,
  })
  articles: Promise<Article[]>;

  @OneToMany(() => Comment, (comment: Comment) => comment.createdBy, {
    lazy: true,
  })
  comments: Promise<Comment[]>;
}
