import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { ButtonHTMLAttributes, FunctionComponent, useMemo } from 'react';
import { OAuth2ProviderType } from '../../../enums/OAuth';
import { IconButton } from '../../common/IconButton';

interface SignInButtonProperties {
  providerType: OAuth2ProviderType;
}

export const SignInButton: FunctionComponent<
  SignInButtonProperties &
    ButtonHTMLAttributes<HTMLButtonElement> &
    FontAwesomeIconProps
> = ({ providerType, onClick }) => {
  const icon = useMemo(() => {
    switch (providerType) {
      case OAuth2ProviderType.GOOGLE:
        return faGoogle;
    }
  }, [providerType]);

  return <IconButton onClick={onClick} icon={icon} />;
};
