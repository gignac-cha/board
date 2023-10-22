import { css } from '@emotion/css';
import { FunctionComponent, MouseEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleSimple } from './ArticleSimple';

interface ArticlesProperties {
  board: Board;
  articles: Article[];
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
  }),
};

export const Articles: FunctionComponent<ArticlesProperties> = ({
  board,
  articles,
}) => {
  const navigate = useNavigate();

  const onClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (!event.metaKey) {
        event.preventDefault();
        event.stopPropagation();
        const href = event.currentTarget.getAttribute('href');
        if (href && window.location.pathname !== href) {
          navigate(href);
        }
      }
    },
    [navigate],
  );

  return (
    <section className={styles.container}>
      <h2>
        Articles <small>({articles.length})</small>
      </h2>
      {articles.map((article: Article, index: number) => (
        <ArticleSimple
          key={index}
          board={board}
          article={article}
          onClick={onClick}
        />
      ))}
    </section>
  );
};
