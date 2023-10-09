import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DOMAttributes, FunctionComponent, useMemo } from 'react';
import { OAuth2ProviderType } from '../../../enums/OAuth';
import { commonStyles } from '../../../styles/common';

interface SignInButtonProperties {
  providerType: OAuth2ProviderType;
}

export const SignInButton: FunctionComponent<
  SignInButtonProperties & DOMAttributes<HTMLButtonElement>
> = ({ providerType, onClick }) => {
  const icon = useMemo(() => {
    switch (providerType) {
      case OAuth2ProviderType.GOOGLE:
        return faGoogle;
    }
  }, [providerType]);

  return (
    <button className={commonStyles.button} onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};
