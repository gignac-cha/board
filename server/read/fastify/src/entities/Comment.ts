import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from './Article';
import { User } from './User';

@Entity({ name: 'comments' })
export class Comment {
  @ManyToOne(() => Article, (article: Article) => article.comments, {
    lazy: true,
  })
  @JoinColumn({ name: 'article_id' })
  article: Promise<Article>;

  @PrimaryColumn({ unique: true })
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ length: 1024 })
  content: string;

  @ManyToOne(() => User, (user: User) => user.articles, { lazy: true })
  @JoinColumn({ name: 'created_by_id' })
  createdBy: Promise<User>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column()
  deleted: boolean;
}
