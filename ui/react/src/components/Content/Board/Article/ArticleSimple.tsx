import { css } from '@emotion/css';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { FunctionComponent, HTMLAttributes, useMemo } from 'react';
import { useCommentsQuery } from '../../../../queries/useCommentQuery';
import { useUserQuery } from '../../../../queries/useUserQuery';
import { commonStyles } from '../../../../styles/common';
import { formatDateTime } from '../../../../utilities/format';

interface ArticleSimpleProperties {
  board: Board;
  article: Article;
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: '1rem',
    padding: '1rem',
    backgroundColor: '#eee',
    borderRadius: 4,
    cursor: 'pointer',
    transition: 'background-color .2s',

    '&:hover': {
      backgroundColor: '#ddd',
    },
  }),
  titleContainer: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    columnGap: '.5rem',
  }),
  rightContainer: css({
    display: 'flex',
    flexDirection: 'row',
    columnGap: '.5rem',
  }),
  title: css({ ...commonStyles.ellipsis(600) }),
};

export const ArticleSimple: FunctionComponent<
  ArticleSimpleProperties & HTMLAttributes<HTMLElement>
> = ({ board, article, onClick }) => {
  const { data: createdBy } = useUserQuery({
    user: { uuid: article.createdByUUID },
  });
  const { data: comments } = useCommentsQuery({ board, article });

  const createdAt = useMemo(
    () => formatDateTime(article.createdAt),
    [article.createdAt],
  );

  return (
    <article title={article.title}>
      <a
        href={`/${board.uniqueId}/${article.titleHash}`}
        className={classNames([styles.container, commonStyles.emptyLink])}
        onClick={onClick}
      >
        <div className={styles.titleContainer}>
          <div className={styles.title}>{article.title}</div>
          {comments && comments.length > 0 && (
            <small>({comments.length})</small>
          )}
        </div>
        <div className={styles.rightContainer}>
          {createdBy?.name}
          <small title={dayjs(article.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
            {createdAt}
          </small>
        </div>
      </a>
    </article>
  );
};
