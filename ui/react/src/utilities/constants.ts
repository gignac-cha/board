export const requestTokenKey = 'token:request';

const getArticleEditorCacheKeyPrefix = (article?: Article) =>
  article ? `${article.uuid}:edit` : 'new';
export const getArticleEditorCachedTitleKey = (
  board: Board,
  article?: Article,
) => `${board.uniqueId}:${getArticleEditorCacheKeyPrefix(article)}:title`;
export const getArticleEditorCachedContentKey = (
  board: Board,
  article?: Article,
) => `${board.uniqueId}:${getArticleEditorCacheKeyPrefix(article)}:content`;
