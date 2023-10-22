import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from './Article';

@Entity({ name: 'boards' })
export class Board {
  @PrimaryColumn({ unique: true })
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ name: 'unique_id', unique: true })
  uniqueId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Article, (article: Article) => article.board, { lazy: true })
  articles: Promise<Article[]>;
}
