import { css } from '@emotion/css';
import { faCancel, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FunctionComponent, useCallback } from 'react';
import {
  useCommentDeleteMutation,
  useCommentsQuery,
} from '../../../../../queries/useCommentQuery';
import { IconButton } from '../../../../common/IconButton';

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
      <IconButton
        className={styles.redButton}
        title="Confirm"
        small
        onClick={onClick}
        icon={faTrash}
        size="xs"
        color="white"
      />
      <IconButton
        title="Cancel"
        small
        onClick={() => onFinished()}
        icon={faCancel}
        size="xs"
      />
    </div>
  );
};
