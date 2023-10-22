import { css } from '@emotion/css';
import classNames from 'classnames';
import { FunctionComponent, useCallback, useRef } from 'react';
import {
  useCommentAddMutation,
  useCommentsQuery,
} from '../../../../../queries/useCommentQuery';
import { commonStyles } from '../../../../../styles/common';

interface NewCommentProperties {
  board: Board;
  article: Article;
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    columnGap: '1rem',
  }),
  comment: css({
    flexGrow: 1,
    padding: '.5rem',
  }),
};

export const NewComment: FunctionComponent<NewCommentProperties> = ({
  board,
  article,
}) => {
  const { refetch: refetchComments } = useCommentsQuery({ board, article });
  const { mutateAsync: addComment } = useCommentAddMutation({ board, article });

  const ref = useRef<HTMLInputElement>(null);

  const onClick = useCallback(async () => {
    if (ref.current) {
      const content = ref.current.value.trim();
      if (content) {
        ref.current.value = '';
        await addComment({ content });
        await refetchComments();
      }
    }
  }, [addComment, refetchComments]);

  return (
    <section className={styles.container}>
      <input
        ref={ref}
        className={classNames([commonStyles.inputText, styles.comment])}
        placeholder="Write comment..."
        maxLength={1000}
      />
      <button className={commonStyles.button} onClick={onClick}>
        Add
      </button>
    </section>
  );
};
