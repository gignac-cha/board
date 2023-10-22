declare interface Article {
  boardUUID: string;
  uuid: string;
  createdByUUID: string;
  title: string;
  titleHash: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

declare type ArticleLike = Pick<Article, 'uuid'>;
