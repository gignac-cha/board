import { css } from '@emotion/css';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { Separator } from '../../common/Separator';

interface BoardHeaderProperties {
  board: Board;
}

const styles = {
  middleContainer: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: '1rem',
  }),
  middleRightContainer: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  }),
};

export const BoardHeader: FunctionComponent<BoardHeaderProperties> = ({
  board,
}) => {
  return (
    <header>
      <h1>
        {board.name} <small>({board.uniqueId})</small>
      </h1>
      <p className={styles.middleContainer}>
        {board.description}
        <small className={styles.middleRightContainer}>
          Created: {dayjs(board.createdAt).format('YYYY-MM-DD HH:mm:ss')}{' '}
          <small>
            (Updated: {dayjs(board.updatedAt).format('YYYY-MM-DD HH:mm:ss')})
          </small>
        </small>
      </p>
      <Separator />
    </header>
  );
};
