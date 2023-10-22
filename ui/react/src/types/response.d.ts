declare interface APIResponse {
  success: boolean;
}

declare interface SignInResponse extends APIResponse {
  requestToken?: string;
}

declare interface UserResponse extends APIResponse {
  user?: User;
}

declare interface BoardsResponse extends APIResponse {
  boards: Board[];
}
declare interface BoardResponse extends APIResponse {
  board?: Board;
}

declare interface ArticlesResponse extends APIResponse {
  articles: Article[];
}
declare interface ArticleResponse extends APIResponse {
  article?: Article;
}

declare interface CommentsResponse extends APIResponse {
  comments: Comment[];
}
declare interface CommentResponse extends APIResponse {
  comment?: Comment;
}
declare interface CommentLikeResponse extends APIResponse {
  comment?: CommentLike;
}
