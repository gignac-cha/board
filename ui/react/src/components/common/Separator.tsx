import { css } from '@emotion/css';
import { commonStyles } from '../../styles/common';

const styles = {
  container: css({
    display: 'flex',
  }),
};

export const Separator = () => {
  return (
    <div className={styles.container}>
      <hr className={commonStyles.separator} />
    </div>
  );
};
