import { css } from '@emotion/css';
import { MouseEvent, lazy, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { commonStyles } from '../../styles/common';
import { Sign } from './Sign/Sign';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    columnGap: '1rem',
    justifyContent: 'space-between',
    width: '100%',
  }),
  title: css({
    padding: '0 1rem',
  }),
};

export const Header = () => {
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
    <header className={styles.container}>
      <h1 className={styles.title}>
        <a href="/" className={commonStyles.emptyLink} onClick={onClick}>
          Board
        </a>
      </h1>
      <Sign />
    </header>
  );
};
export const LazyHeader = lazy(async () => ({ default: Header }));
