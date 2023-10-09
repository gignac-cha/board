import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useLocalStorageQuery } from '../queries/useLocalStorageQuery';
import { useUserMeQuery } from '../queries/useUserQuery';
import { doNothing } from '../utilities/common';
import { requestTokenKey } from '../utilities/constants';

interface SignContextProperties {
  isSignedIn: boolean;
  requestToken?: string | undefined;
  me?: User | undefined;
  onSignOut: () => void;
}

const defaultValue: SignContextProperties = {
  isSignedIn: false,
  onSignOut: doNothing,
};

const SignContext = createContext<SignContextProperties>(defaultValue);

export const SignContextProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { data: cachedToken } = useLocalStorageQuery(requestTokenKey);
  const isSignedIn = useMemo(() => !!cachedToken, [cachedToken]);
  const { data: user, remove: removeMe } = useUserMeQuery({
    requestToken: cachedToken,
  });
  const onSignOut = useCallback(() => removeMe(), [removeMe]);

  return (
    <SignContext.Provider
      value={{
        isSignedIn,
        requestToken: cachedToken,
        me: user,
        onSignOut,
      }}
    >
      {children}
    </SignContext.Provider>
  );
};

export const useSignContext = () => useContext(SignContext);
