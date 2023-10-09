import { css } from '@emotion/css';
import { useSignContext } from '../../../contexts/SignContext';
import { SignedIn } from './SignedIn';
import { SignedOut } from './SignedOut';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    columnGap: '1rem',
    justifyContent: 'flex-end',
    padding: '0 1rem',
  }),
};

export const Sign = () => {
  const { isSignedIn, me } = useSignContext();

  return (
    <section className={styles.container}>
      {isSignedIn && me ? <SignedIn me={me} /> : <SignedOut />}
    </section>
  );
};
