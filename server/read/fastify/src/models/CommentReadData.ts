import { Comment } from '../entities/Comment';

export class CommentReadData {
  articleUUID: string;
  uuid: string;
  createdByUUID: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(private comment: Comment) {
    this.uuid = comment.uuid;
    this.content = comment.content;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
  }

  async lazyFill() {
    const article = await this.comment.article;
    this.articleUUID = article.uuid;
    const createdBy = await this.comment.createdBy;
    this.createdByUUID = createdBy.uuid;
  }
}
