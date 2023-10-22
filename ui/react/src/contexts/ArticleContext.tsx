import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { useParams } from 'react-router-dom';
import { useArticleQuery } from '../queries/useArticleQuery';
import { useArticlesContext } from './ArticlesContext';

interface ArticleContextProperties {
  articleTitleHash?: string;
  article?: Article;
}

const defaultValue: ArticleContextProperties = {};

const ArticleContext = createContext<ArticleContextProperties>(defaultValue);

type ArticleParams = 'articleTitleHash';

interface ArticleContextProvider {
  board: Board;
}

export const ArticleContextProvider: FunctionComponent<
  ArticleContextProvider & PropsWithChildren
> = ({ board, children }) => {
  const { articles } = useArticlesContext();
  const { articleTitleHash } = useParams<ArticleParams>();
  const selectedArticle = useMemo(
    () =>
      articles.find(
        (article: Article) => article.titleHash === articleTitleHash,
      ),
    [articleTitleHash, articles],
  );
  const { data: article } = useArticleQuery({
    board,
    article: selectedArticle,
  });

  return (
    <ArticleContext.Provider value={{ articleTitleHash, article }}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticleContext = () => useContext(ArticleContext);
