import { css } from '@emotion/css';
import { FunctionComponent } from 'react';
import Markdown from 'react-markdown';
import { PluggableList } from 'react-markdown/lib';
import { useNavigate } from 'react-router-dom';
import { getComponents } from '../../../../utilities/markdownComponents';
import { remarkCheckbox } from '../../../../utilities/remarkCheckboxPlugin';

interface ViewerProperties {
  content: string;
}

const styles = {
  viewer: css({
    padding: '1rem',
  }),
};

const remarkPlugins: PluggableList = [remarkCheckbox];

export const Viewer: FunctionComponent<ViewerProperties> = ({ content }) => {
  const navigate = useNavigate();

  return (
    <Markdown
      className={styles.viewer}
      components={getComponents({ navigate })}
      remarkPlugins={remarkPlugins}
    >
      {content}
    </Markdown>
  );
};
