import { FunctionComponent, lazy, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useArticleContext } from '../../../contexts/ArticleContext';
import { useArticlesContext } from '../../../contexts/ArticlesContext';
import { useSignContext } from '../../../contexts/SignContext';
import { ErrorMessagePanel } from '../../common/ErrorMessagePanel';

const LazyArticles = lazy(() =>
  import('./Article/Articles').then(({ Articles }) => ({ default: Articles })),
);
const LazyArticle = lazy(() =>
  import('./Article/Article').then(({ Article }) => ({ default: Article })),
);
const LazyArticleEditor = lazy(() =>
  import('./ArticleEditor/ArticleEditor').then(({ ArticleEditor }) => ({
    default: ArticleEditor,
  })),
);

interface BoardContentWithArticleEditorProperties {
  board: Board;
  article: Article;
}

export const BoardContentWithArticleEditor: FunctionComponent<
  BoardContentWithArticleEditorProperties
> = ({ board, article }) => {
  const { isSignedIn } = useSignContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn && window.location.pathname.endsWith('/edit')) {
      navigate(`/${board.uniqueId}/${article.titleHash}`, { replace: true });
    }
  }, [article.titleHash, board.uniqueId, isSignedIn, navigate]);

  return <LazyArticleEditor board={board} article={article} />;
};

interface BoardContentWithArticleProperties {
  board: Board;
  article: Article;
}

export const BoardContentWithArticle: FunctionComponent<
  BoardContentWithArticleProperties
> = ({ board, article }) => {
  return (
    <Routes>
      <Route index element={<LazyArticle board={board} article={article} />} />
      <Route
        path="edit"
        element={
          <BoardContentWithArticleEditor board={board} article={article} />
        }
      />
    </Routes>
  );
};

interface BoardContentProperties {
  board: Board;
}

export const BoardContent: FunctionComponent<BoardContentProperties> = ({
  board,
}) => {
  const { isSignedIn } = useSignContext();
  const { articles } = useArticlesContext();
  const { articleTitleHash, article } = useArticleContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn && articleTitleHash === 'new') {
      navigate(`/${board.uniqueId}`, { replace: true });
    }
  }, [articleTitleHash, board.uniqueId, isSignedIn, navigate]);

  return articleTitleHash ? (
    articleTitleHash === 'new' ? (
      <LazyArticleEditor board={board} />
    ) : article ? (
      <BoardContentWithArticle board={board} article={article} />
    ) : (
      <ErrorMessagePanel message={`Invalid article: ${articleTitleHash}`} />
    )
  ) : (
    <LazyArticles board={board} articles={articles} />
  );
};
