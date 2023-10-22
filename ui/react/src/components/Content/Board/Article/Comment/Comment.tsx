import { css } from '@emotion/css';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { FunctionComponent, useState } from 'react';
import { useSignContext } from '../../../../../contexts/SignContext';
import { useUserQuery } from '../../../../../queries/useUserQuery';
import { formatDateTime } from '../../../../../utilities/format';
import { IconButton } from '../../../../common/IconButton';
import { DeleteComment } from './DeleteComment';
import { EditComment } from './EditComment';

interface CommentProperties {
  board: Board;
  article: Article;
  comment: Comment;
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    columnGap: '1rem',
    padding: '0 1rem',
  }),
  rightContainer: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    columnGap: '1rem',
  }),
  notEditingRightContainer: css({
    flexGrow: 1,
  }),
  rightButtonContainer: css({
    display: 'flex',
    flexDirection: 'row',
    columnGap: '.5rem',
    alignItems: 'center',
  }),
  content: css({
    maxWidth: 600,
    wordBreak: 'break-all',
  }),
};

export const Comment: FunctionComponent<CommentProperties> = ({
  board,
  article,
  comment,
}) => {
  const { me } = useSignContext();

  const { data: createdBy } = useUserQuery({
    user: { uuid: comment.createdByUUID },
  });

  const [isEditing, setEditing] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  return (
    <article className={styles.container}>
      {isEditing ? (
        <EditComment
          board={board}
          article={article}
          comment={comment}
          onFinished={() => setEditing(false)}
        />
      ) : (
        <span className={styles.content}>{comment.content}</span>
      )}
      <span
        className={classNames([
          styles.rightContainer,
          !isEditing && styles.notEditingRightContainer,
        ])}
      >
        {createdBy?.uuid === me?.uuid && (
          <span className={styles.rightButtonContainer}>
            {!isEditing && (
              <IconButton
                title="Edit"
                small
                onClick={() => setEditing(true)}
                icon={faEdit}
                size="xs"
              />
            )}
            {isDeleting ? (
              <DeleteComment
                board={board}
                article={article}
                comment={comment}
                onFinished={() => setDeleting(false)}
              />
            ) : (
              <IconButton
                title="Delete"
                small
                onClick={() => setDeleting(true)}
                icon={faTrash}
                size="xs"
              />
            )}
          </span>
        )}
        <span>{createdBy?.name}</span>
        <span title={dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
          {formatDateTime(comment.createdAt)}
        </span>
      </span>
    </article>
  );
};
