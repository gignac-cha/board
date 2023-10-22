import { css } from '@emotion/css';
import classNames from 'classnames';
import { FunctionComponent, MouseEvent } from 'react';
import Markdown from 'react-markdown';
import { PluggableList } from 'react-markdown/lib';
import { useNavigate } from 'react-router-dom';
import { commonStyles } from '../../../../styles/common';
import { getComponents } from '../../../../utilities/markdownComponents';
import { remarkCheckbox } from '../../../../utilities/remarkCheckboxPlugin';

interface PreviewModalProperties {
  show: boolean;
  title?: string;
  markdown?: string;
  close: () => void;
}

const styles = {
  container: css({
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, .1)',
    opacity: 0,
    zIndex: -1,
    transition: 'opacity .2s, z-index .2s',
  }),
  showContainer: css({
    opacity: '1 !important',
    zIndex: '1 !important',
  }),
  middleContainer: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: '1rem',
    maxWidth: '90%',
    maxHeight: '90%',
  }),
  titleContainer: css({
    boxSizing: 'border-box',
    padding: '1rem',
    width: '100%',
    minWidth: 480,
    backgroundColor: 'white',
    borderRadius: 4,
    boxShadow: '0 0 1rem 0 rgba(0, 0, 0, .1)',
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
  }),
  title: css({
    ...commonStyles.ellipsis('100%'),
  }),
  viewer: css({
    padding: '1rem',
    minWidth: 480,
    minHeight: 640,
    backgroundColor: 'white',
    borderRadius: 4,
    boxShadow: '0 0 1rem 0 rgba(0, 0, 0, .1)',
    overflow: 'scroll',
  }),
};

const remarkPlugins: PluggableList = [remarkCheckbox];

export const PreviewModal: FunctionComponent<PreviewModalProperties> = ({
  show,
  title = '',
  markdown = '',
  close,
}) => {
  const navigate = useNavigate();

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className={classNames([styles.container, show && styles.showContainer])}
      onClick={() => close()}
    >
      <div className={styles.middleContainer} onClick={onClick}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>{title}</div>
        </div>
        <Markdown
          className={styles.viewer}
          components={getComponents({ navigate })}
          remarkPlugins={remarkPlugins}
        >
          {markdown}
        </Markdown>
      </div>
    </div>
  );
};
