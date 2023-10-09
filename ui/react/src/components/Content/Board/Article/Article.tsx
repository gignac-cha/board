import { css } from '@emotion/css';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { FunctionComponent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignContext } from '../../../../contexts/SignContext';
import { useCommentsQuery } from '../../../../queries/useCommentQuery';
import { commonStyles } from '../../../../styles/common';
import { IconButton } from '../../../common/IconButton';
import { Separator } from '../../../common/Separator';
import { Comments } from './Comment/Comments';
import { NewComment } from './Comment/NewComment';
import { Viewer } from './Viewer';

interface ArticleProperties {
  board: Board;
  article: Article;
}

const styles = {
  container: css({
    padding: '1rem',
    border: '1px solid #eee',
    borderRadius: 4,
  }),
  headerContainer: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: '1rem',
  }),
  middleTopContainer: css({
    display: 'flex',
    justifyContent: 'flex-end',
  }),
  footerContainer: css({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
  }),
  title: css({ ...commonStyles.ellipsis(800) }),
};

export const Article: FunctionComponent<ArticleProperties> = ({
  board,
  article,
}) => {
  const { isSignedIn, me } = useSignContext();

  const navigate = useNavigate();

  const onClickEditArticle = useCallback(() => {
    navigate(`/${board.uniqueId}/${article.titleHash}/edit`);
  }, [article.titleHash, navigate, board.uniqueId]);

  const { data: comments = [] } = useCommentsQuery({ board, article });

  return (
    <section className={styles.container}>
      <header className={styles.headerContainer}>
        <h2 className={styles.title} title={article.title}>
          {article.title}
        </h2>
        {article.createdByUUID === me?.uuid && (
          <IconButton onClick={onClickEditArticle} icon={faEdit} text="Edit" />
        )}
      </header>
      <p className={styles.middleTopContainer}>
        <small>
          Created: {dayjs(article.createdAt).format('YYYY-MM-DD HH:mm:ss')}{' '}
          <small>
            (Updated: {dayjs(article.updatedAt).format('YYYY-MM-DD HH:mm:ss')})
          </small>
        </small>
      </p>
      <Separator />
      <Viewer content={article.content} />
      <footer className={styles.footerContainer}>
        <Comments board={board} article={article} comments={comments} />
        {isSignedIn && <NewComment board={board} article={article} />}
      </footer>
    </section>
  );
};
