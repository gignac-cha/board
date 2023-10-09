import { css } from '@emotion/css';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, useCallback } from 'react';
import {
  useLocalStorageMutation,
  useLocalStorageQuery,
} from '../../../queries/useLocalStorageQuery';
import { commonStyles } from '../../../styles/common';
import { requestTokenKey } from '../../../utilities/constants';

interface SignedInProperties {
  me: User;
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    columnGap: '.5rem',
    alignItems: 'center',
  }),
};

export const SignedIn: FunctionComponent<SignedInProperties> = ({ me }) => {
  const { refetch: refetchCachedToken } = useLocalStorageQuery(requestTokenKey);
  const { mutateAsync: setCachedToken } =
    useLocalStorageMutation(requestTokenKey);

  const onClickSignOut = useCallback(async () => {
    await setCachedToken();
    await refetchCachedToken();
  }, [refetchCachedToken, setCachedToken]);

  return (
    <section className={styles.container}>
      {me.name}
      <button className={commonStyles.button} onClick={onClickSignOut}>
        <FontAwesomeIcon icon={faRightFromBracket} /> Sign Out
      </button>
    </section>
  );
};
