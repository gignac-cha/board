import { css } from '@emotion/css';
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { FunctionComponent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '../../common/IconButton';

interface BoardControlProperties {
  board: Board;
}

const styles = {
  headerBottomContainer: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    columnGap: '1rem',
  }),
};

export const BoardControl: FunctionComponent<BoardControlProperties> = ({
  board,
}) => {
  const navigate = useNavigate();

  const onClickNewArticle = useCallback(() => {
    navigate(`/${board.uniqueId}/new`);
  }, [board.uniqueId, navigate]);
  const onClickNewArticleCancel = useCallback(() => {
    navigate(`/${board.uniqueId}`);
  }, [board.uniqueId, navigate]);

  return (
    <p className={styles.headerBottomContainer}>
      {window.location.pathname.endsWith('/new') ? (
        <IconButton
          onClick={onClickNewArticleCancel}
          icon={faX}
          text="Cancel"
        />
      ) : (
        <IconButton
          onClick={onClickNewArticle}
          icon={faPlus}
          text="New Article"
        />
      )}
    </p>
  );
};
