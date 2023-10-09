import { useMutation } from '@tanstack/react-query';
import { SignInProperties, signIn } from '../utilities/request';

export const useSignInMutation = () =>
  useMutation<string | undefined, Error, SignInProperties>({
    mutationKey: ['signIn'],
    mutationFn: ({ providerType, accessToken }: SignInProperties) =>
      signIn({ providerType, accessToken }),
  });
