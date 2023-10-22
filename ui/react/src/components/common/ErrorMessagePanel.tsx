import { css } from '@emotion/css';
import { FunctionComponent } from 'react';

interface ErrorMessagePanelProperties {
  message: string;
}

const styles = {
  container: css({
    padding: '1rem',
    width: '100%',
    backgroundColor: '#fbb',
    borderRadius: 4,
  }),
};

export const ErrorMessagePanel: FunctionComponent<
  ErrorMessagePanelProperties
> = ({ message }) => {
  return (
    <section className={styles.container}>
      <b>{message}</b>
    </section>
  );
};
