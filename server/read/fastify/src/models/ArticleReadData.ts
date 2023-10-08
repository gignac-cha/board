import { Article } from '../entities/Article';

export class ArticleReadData {
  boardUUID: string;
  uuid: string;
  createdByUUID: string;
  title: string;
  titleHash: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(private article: Article) {
    this.uuid = article.uuid;
    this.title = article.title;
    this.titleHash = article.titleHash;
    this.content = article.content;
    this.createdAt = article.createdAt;
    this.updatedAt = article.updatedAt;
  }

  async lazyFill() {
    const board = await this.article.board;
    this.boardUUID = board.uuid;
    const createdBy = await this.article.createdBy;
    this.createdByUUID = createdBy.uuid;
  }
}
