import { css } from '@emotion/css';
import { faCancel, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { FunctionComponent, useCallback } from 'react';
import {
  useCommentDeleteMutation,
  useCommentsQuery,
} from '../../../../../queries/useCommentQuery';
import { commonStyles } from '../../../../../styles/common';

interface DeleteCommentProperties {
  board: Board;
  article: Article;
  comment: Comment;
  onFinished: () => void;
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: '.5rem',
  }),
  redButton: css({
    backgroundColor: 'red !important',
  }),
};

export const DeleteComment: FunctionComponent<DeleteCommentProperties> = ({
  board,
  article,
  comment,
  onFinished,
}) => {
  const { refetch: refetchComments } = useCommentsQuery({ board, article });
  const { mutateAsync: deleteComment } = useCommentDeleteMutation({
    board,
    article,
    comment,
  });

  const onClick = useCallback(async () => {
    onFinished();
    await deleteComment();
    await refetchComments();
  }, [deleteComment, onFinished, refetchComments]);

  return (
    <div className={styles.container}>
      <button
        className={classNames([
          commonStyles.button,
          commonStyles.smallButton,
          styles.redButton,
        ])}
        title="Confirm"
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faTrash} size="xs" color="white" />
      </button>
      <button
        className={classNames([commonStyles.button, commonStyles.smallButton])}
        title="Cancel"
        onClick={() => onFinished()}
      >
        <FontAwesomeIcon icon={faCancel} size="xs" />
      </button>
    </div>
  );
};
