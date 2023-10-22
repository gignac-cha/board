import { css } from '@emotion/css';
import { FunctionComponent } from 'react';
import { Comment } from './Comment';

interface CommentsProperties {
  board: Board;
  article: Article;
  comments: Comment[];
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '.5rem',
  }),
};

export const Comments: FunctionComponent<CommentsProperties> = ({
  board,
  article,
  comments,
}) => {
  return (
    <section className={styles.container}>
      <h3>
        Comments <small>({comments.length})</small>
      </h3>
      {comments.map((comment: Comment, index: number) => (
        <Comment
          key={index}
          board={board}
          article={article}
          comment={comment}
        />
      ))}
    </section>
  );
};
