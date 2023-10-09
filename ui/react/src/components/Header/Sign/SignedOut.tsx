import { css } from '@emotion/css';
import { useCallback } from 'react';
import { OAuth2ProviderType } from '../../../enums/OAuth';
import { useLocalStorageQuery } from '../../../queries/useLocalStorageQuery';
import { requestTokenKey } from '../../../utilities/constants';
import { getOAuth2ProviderURL } from '../../../utilities/oauth2';
import { SignInButton } from './SignInButton';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    columnGap: '.5rem',
    alignItems: 'center',
  }),
};

export const SignedOut = () => {
  const { refetch: refetchCachedToken } = useLocalStorageQuery(requestTokenKey);

  const onClickSignIn = useCallback(
    (providerType: OAuth2ProviderType) => {
      const url = getOAuth2ProviderURL(providerType);
      const childWindow = window.open(url.toString());
      childWindow?.addEventListener('unload', async () => {
        await refetchCachedToken();
      });
    },
    [refetchCachedToken],
  );

  return (
    <section className={styles.container}>
      Sign In with
      <SignInButton
        providerType={OAuth2ProviderType.GOOGLE}
        onClick={() => onClickSignIn(OAuth2ProviderType.GOOGLE)}
      />
    </section>
  );
};
