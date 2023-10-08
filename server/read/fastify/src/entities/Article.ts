import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from './Board';
import { Comment } from './Comment';
import { User } from './User';

@Entity({ name: 'articles' })
export class Article {
  @ManyToOne(() => Board, (board: Board) => board.articles, { lazy: true })
  @JoinColumn({ name: 'board_id' })
  board: Promise<Board>;

  @PrimaryColumn({ unique: true })
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column()
  title: string;

  @Column({ name: 'title_hash', unique: true })
  titleHash: string;

  @Column({ length: 4096 })
  content: string;

  @ManyToOne(() => User, (user: User) => user.articles, { lazy: true })
  @JoinColumn({ name: 'created_by_id' })
  createdBy: Promise<User>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Comment, (comment: Comment) => comment.article, {
    lazy: true,
  })
  comments: Promise<Comment[]>;
}
