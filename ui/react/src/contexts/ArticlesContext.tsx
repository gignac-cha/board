import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
} from 'react';
import { useArticlesQuery } from '../queries/useArticleQuery';

interface ArticlesContextProperties {
  articles: Article[];
}

const defaultValue: ArticlesContextProperties = {
  articles: [],
};

const ArticlesContext = createContext<ArticlesContextProperties>(defaultValue);

interface ArticlesContextProvider {
  board: Board;
}

export const ArticlesContextProvider: FunctionComponent<
  ArticlesContextProvider & PropsWithChildren
> = ({ board, children }) => {
  const { data: articles = [] } = useArticlesQuery({
    board,
  });

  return (
    <ArticlesContext.Provider value={{ articles }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticlesContext = () => useContext(ArticlesContext);
