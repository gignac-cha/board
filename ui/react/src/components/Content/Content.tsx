import { css } from '@emotion/css';
import { Route, Routes } from 'react-router-dom';
import { useBoardContext } from '../../contexts/BoardContext';
import { ErrorMessagePanel } from '../common/ErrorMessagePanel';
import { Board } from './Board/Board';

const styles = {
  container: css({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'scroll',
  }),
};

export const Content = () => {
  const { boardUniqueId, board } = useBoardContext();

  return (
    <section className={styles.container}>
      {board ? (
        <Routes>
          <Route
            path=":articleTitleHash?/*"
            element={<Board board={board} />}
          />
        </Routes>
      ) : (
        boardUniqueId && (
          <ErrorMessagePanel message={`Invalid board: ${boardUniqueId}`} />
        )
      )}
    </section>
  );
};
export default Content;
