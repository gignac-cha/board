import { css } from '@emotion/css';
import { useBoardsContext } from '../../contexts/BoardsContext';
import { Boards } from './Boards';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
    padding: '1rem',
    minWidth: 240,
    backgroundColor: '#eee',
    borderRadius: 4,
  }),
};

export const Sidebar = () => {
  const { boards } = useBoardsContext();

  return (
    <aside className={styles.container}>
      <Boards boards={boards} />
    </aside>
  );
};
