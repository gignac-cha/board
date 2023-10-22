import { css } from '@emotion/css';
import { FunctionComponent, Suspense, lazy } from 'react';
import { ArticleContextProvider } from '../../../contexts/ArticleContext';
import { ArticlesContextProvider } from '../../../contexts/ArticlesContext';
import { useSignContext } from '../../../contexts/SignContext';
import { Loading } from '../../common/Loading';
import { BoardContent } from './BoardContent';
import { BoardControl } from './BoardControl';
import { BoardHeader } from './BoardHeader';

interface BoardProperties {
  board: Board;
}

const styles = {
  container: css({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
  }),
};

export const Board: FunctionComponent<BoardProperties> = ({ board }) => {
  const { isSignedIn } = useSignContext();

  return (
    <article className={styles.container}>
      <BoardHeader board={board} />
      {isSignedIn && <BoardControl board={board} />}
      <Suspense fallback={<Loading />}>
        <ArticlesContextProvider board={board}>
          <ArticleContextProvider board={board}>
            <BoardContent board={board} />
          </ArticleContextProvider>
        </ArticlesContextProvider>
      </Suspense>
    </article>
  );
};
export const LazyBoard = lazy(async () => ({ default: Board }));
