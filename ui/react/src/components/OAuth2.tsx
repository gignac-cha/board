import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { OAuth2ProviderType } from '../enums/OAuth';
import { useSignInMutation } from '../queries/useSignInQuery';
import { requestTokenKey } from '../utilities/constants';

const getOAuth2ProviderType = (provider?: string): OAuth2ProviderType => {
  switch (provider) {
    case 'google':
      return OAuth2ProviderType.GOOGLE;
    default:
      throw Error(`Invalid provider: ${provider}`);
  }
};

export const OAuth2 = () => {
  const params = useParams<'provider'>();
  const [searchParams] = useSearchParams();

  const { mutateAsync: signIn } = useSignInMutation();

  useEffect(() => {
    if (params.provider) {
      const providerType = getOAuth2ProviderType(params.provider);
      const hashSearchParams = window.location.hash.slice(1);
      const url = new URL(window.location.origin);
      url.search = hashSearchParams;
      const accessToken = url.searchParams.get('access_token');

      if (providerType && accessToken) {
        signIn({ providerType, accessToken }).then((requestToken?: string) => {
          if (requestToken) {
            localStorage.setItem(requestTokenKey, requestToken);
          }
          window.close();
        });
      }
    }
  }, [params.provider, searchParams, signIn]);

  return <></>;
};
