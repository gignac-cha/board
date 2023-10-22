import { css } from '@emotion/css';
import { FunctionComponent, MouseEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoardContext } from '../../contexts/BoardContext';
import { BoardSimple } from './BoardSimple';

interface BoardsProperties {
  boards: Board[];
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '.5rem',
  }),
};

export const Boards: FunctionComponent<BoardsProperties> = ({ boards }) => {
  const { selectedBoard } = useBoardContext();

  const navigate = useNavigate();

  const onClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (!event.metaKey) {
        event.preventDefault();
        event.stopPropagation();
        const href = event.currentTarget.getAttribute('href');
        if (href && window.location.pathname !== href) {
          navigate(href);
        }
      }
    },
    [navigate],
  );

  return (
    <section className={styles.container}>
      <h1>
        Boards <small>({boards.length})</small>
      </h1>
      {boards.map((board: Board, index: number) => (
        <BoardSimple
          key={index}
          board={board}
          isSelected={board === selectedBoard}
          onClick={onClick}
        />
      ))}
    </section>
  );
};
