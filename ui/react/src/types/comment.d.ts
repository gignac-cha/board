declare interface Comment {
  boardUUID: string;
  articleUUID: string;
  uuid: string;
  createdByUUID: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

declare type CommentLike = Pick<Comment, 'uuid'>;
