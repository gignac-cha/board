import { css } from '@emotion/css';
import { Suspense, lazy } from 'react';
import { BoardContextProvider } from '../contexts/BoardContext';
import { BoardsContextProvider } from '../contexts/BoardsContext';
import { Loading } from './common/Loading';

const styles = {
  container: css({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    columnGap: '1rem',
    padding: '1rem',
  }),
};

const LazySidebar = lazy(() =>
  import('./Sidebar/Sidebar').then(({ Sidebar }) => ({ default: Sidebar })),
);
const LazyContent = lazy(() =>
  import('./Content/Content').then(({ Content }) => ({ default: Content })),
);

export const Main = () => {
  return (
    <main className={styles.container}>
      <Suspense fallback={<Loading />}>
        <BoardsContextProvider>
          <BoardContextProvider>
            <LazySidebar />
            <LazyContent />
          </BoardContextProvider>
        </BoardsContextProvider>
      </Suspense>
    </main>
  );
};
export const LazyMain = lazy(async () => ({ default: Main }));
