import { css } from '@emotion/css';
import classNames from 'classnames';
import { FunctionComponent, HtmlHTMLAttributes } from 'react';
import { commonStyles } from '../../styles/common';

interface BoardSimpleProperties {
  board: Board;
  isSelected: boolean;
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  linkContainer: css({
    padding: '.5rem',
    borderRadius: 4,
    cursor: 'pointer',
    transition: 'background-color .2s',

    '&:hover': {
      backgroundColor: '#ddd',
    },
  }),
  selectedLinkContainer: css({
    backgroundColor: '#ccc !important',
  }),
};

export const BoardSimple: FunctionComponent<
  BoardSimpleProperties & HtmlHTMLAttributes<HTMLElement>
> = ({ board, isSelected, onClick }) => {
  return (
    <article className={styles.container} title={board.description}>
      <a
        href={`/${board.uniqueId}`}
        className={classNames([
          styles.linkContainer,
          isSelected && styles.selectedLinkContainer,
          commonStyles.emptyLink,
        ])}
        onClick={onClick}
      >
        {board.name} <small>({board.uniqueId})</small>
      </a>
    </article>
  );
};
