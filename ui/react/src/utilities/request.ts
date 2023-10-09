import { OAuth2ProviderType } from '../enums/OAuth';

export interface SignInProperties {
  providerType: OAuth2ProviderType;
  accessToken: string;
}

export const signIn = async ({
  providerType,
  accessToken,
}: SignInProperties): Promise<string | undefined> => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify({ providerType, accessToken });
  const response: Response = await fetch(
    `${import.meta.env.VITE_WRITE_SERVER_URL}/api/v1/oauth2/sign/in`,
    { method: 'POST', headers, body },
  );
  const { requestToken }: SignInResponse = await response.json();
  return requestToken;
};

export const getUserMe = async ({ requestToken }: NeedTokenProperties) => {
  const headers = {
    Authorization: `Bearer ${requestToken}`,
  };
  const response: Response = await fetch(
    `${import.meta.env.VITE_READ_SERVER_URL}/api/v1/users/me`,
    { headers },
  );
  const { success, user }: UserResponse = await response.json();
  if (!success) {
    throw Error('Request failed: `user`');
  }
  return user;
};

interface GetUserProperties {
  user: UserLike;
}

export const getUser = async ({ user: { uuid } }: GetUserProperties) => {
  const response: Response = await fetch(
    `${import.meta.env.VITE_READ_SERVER_URL}/api/v1/users/${uuid}`,
  );
  const { success, user }: UserResponse = await response.json();
  if (!success) {
    throw Error('Request failed: `user`');
  }
  return user;
};

export const getBoards = async () => {
  const response: Response = await fetch(
    `${import.meta.env.VITE_READ_SERVER_URL}/api/v1/boards`,
  );
  const { success, boards }: BoardsResponse = await response.json();
  if (!success) {
    throw Error('Request failed: `boards`');
  }
  return boards;
};

interface GetBoardProperties {
  board: BoardLike;
}

export const getBoard = async ({ board: { uuid } }: GetBoardProperties) => {
  const response: Response = await fetch(
    `${import.meta.env.VITE_READ_SERVER_URL}/api/v1/boards/${uuid}`,
  );
  const { success, board }: BoardResponse = await response.json();
  if (!success) {
    throw Error('Request failed: `board`');
  }
  return board;
};

interface GetArticlesProperties {
  board: BoardLike;
}

export const getArticles = async ({ board }: GetArticlesProperties) => {
  const response: Response = await fetch(
    `${import.meta.env.VITE_READ_SERVER_URL}/api/v1/boards/${
      board.uuid
    }/articles`,
  );
  const { success, articles }: ArticlesResponse = await response.json();
  if (!success) {
    throw Error('Request failed: `articles`');
  }
  return articles;
};

interface GetArticleProperties {
  board: BoardLike;
  article: ArticleLike;
}

export const getArticle = async ({
  board,
  article: { uuid },
}: GetArticleProperties) => {
  const response: Response = await fetch(
    `${import.meta.env.VITE_READ_SERVER_URL}/api/v1/boards/${
      board.uuid
    }/articles/${uuid}`,
  );
  const { success, article }: ArticleResponse = await response.json();
  if (!success) {
    throw Error('Request failed: `article`');
  }
  return article;
};

export interface AddArticleProperties {
  board: BoardLike;
  title: string;
  content: string;
}

export const addArticle = async ({
  board,
  title,
  content,
  requestToken,
}: AddArticleProperties & NeedTokenProperties) => {
  const headers = {
    Authorization: `Bearer ${requestToken}`,
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify({ title, content });
  const response: Response = await fetch(
    `${import.meta.env.VITE_WRITE_SERVER_URL}/api/v1/boards/${
      board.uuid
    }/articles`,
    { method: 'POST', headers, body },
  );
  const { success, article }: ArticleResponse = await response.json();
  if (!success) {
    throw Error('Request failed: `article`');
  }
  return article;
};

export interface EditArticleProperties {
  board: BoardLike;
  article: ArticleLike;
  title: string;
  content: string;
}

export const editArticle = async ({
  board,
  article: { uuid },
  title,
  content,
  requestToken,
}: EditArticleProperties & NeedTokenProperties) => {
  const headers = {
    Authorization: `Bearer ${requestToken}`,
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify({ title, content });
  const response: Response = await fetch(
    `${import.meta.env.VITE_WRITE_SERVER_URL}/api/v1/boards/${
      board.uuid
    }/articles/${uuid}`,
    { method: 'PUT', headers, body },
  );
  const { success, article }: ArticleResponse = await response.json();
  if (!success) {
    throw Error('Request failed: `article`');
  }
  return article;
};

interface GetCommentsProperties {
  board: BoardLike;
  article: ArticleLike;
}

export const getComments = async ({
  board,
  article,
}: GetCommentsProperties) => {
  const response: Response = await fetch(
    `${import.meta.env.VITE_READ_SERVER_URL}/api/v1/boards/${
      board.uuid
    }/articles/${article.uuid}/comments`,
  );
  const { success, comments }: CommentsResponse = await response.json();
  if (!success) {
    throw Error('Request failed: `comments`');
  }
  return comments;
};

// interface GetCommentProperties {
//   board: BoardLike;
//   article: ArticleLike;
//   comment: CommentLike;
// }

// export const getComment = async ({
//   board,
//   article,
//   comment: { uuid },
// }: GetCommentProperties) => {
//   const response: Response = await fetch(
//     `${import.meta.env.VITE_READ_SERVER_URL}/api/v1/boards/${
//       board.uuid
//     }/articles/${article.uuid}/comments/${uuid}`,
//   );
//   const { success, comment }: CommentResponse = await response.json();
//   if (!success) {
//     throw Error('Request failed: `comment`');
//   }
//   return comment;
// };

export interface AddCommentProperties {
  board: BoardLike;
  article: ArticleLike;
  content: string;
}

export const addComment = async ({
  board,
  article,
  content,
  requestToken,
}: AddCommentProperties & NeedTokenProperties) => {
  const headers = {
    Authorization: `Bearer ${requestToken}`,
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify({ content });
  const response: Response = await fetch(
    `${import.meta.env.VITE_WRITE_SERVER_URL}/api/v1/boards/${
      board.uuid
    }/articles/${article.uuid}/comments`,
    { method: 'POST', headers, body },
  );
  const { success, comment }: CommentResponse = await response.json();
  if (!success) {
    throw Error('Request failed: `comment`');
  }
  return comment;
};

export interface EditCommentProperties {
  board: BoardLike;
  article: ArticleLike;
  comment: CommentLike;
  content: string;
}

export const editComment = async ({
  board,
  article,
  comment: { uuid },
  content,
  requestToken,
}: EditCommentProperties & NeedTokenProperties) => {
  const headers = {
    Authorization: `Bearer ${requestToken}`,
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify({ content });
  const response: Response = await fetch(
    `${import.meta.env.VITE_WRITE_SERVER_URL}/api/v1/boards/${
      board.uuid
    }/articles/${article.uuid}/comments/${uuid}`,
    { method: 'PUT', headers, body },
  );
  const { success, comment }: CommentResponse = await response.json();
  if (!success) {
    throw Error('Request failed: `comment`');
  }
  return comment;
};

export interface DeleteCommentProperties {
  board: BoardLike;
  article: ArticleLike;
  comment: CommentLike;
}

export const deleteComment = async ({
  board,
  article,
  comment: { uuid },
  requestToken,
}: DeleteCommentProperties & NeedTokenProperties) => {
  const headers = {
    Authorization: `Bearer ${requestToken}`,
    'Content-Type': 'application/json',
  };
  const response: Response = await fetch(
    `${import.meta.env.VITE_WRITE_SERVER_URL}/api/v1/boards/${
      board.uuid
    }/articles/${article.uuid}/comments/${uuid}`,
    { method: 'DELETE', headers },
  );
  const { success, comment }: CommentLikeResponse = await response.json();
  if (!success) {
    throw Error('Request failed: `comment`');
  }
  return comment;
};
