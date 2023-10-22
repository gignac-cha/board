import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import {
  ButtonHTMLAttributes,
  FunctionComponent,
  PropsWithChildren,
} from 'react';
import { commonStyles } from '../../styles/common';

interface IconButtonProperties {
  text?: string;
  small?: boolean;
}

export const IconButton: FunctionComponent<
  PropsWithChildren &
    IconButtonProperties &
    ButtonHTMLAttributes<HTMLButtonElement> &
    FontAwesomeIconProps
> = ({
  children,
  text,
  small = false,
  className,
  title,
  onClick,
  disabled,
  icon,
  size,
  color,
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames([
        commonStyles.button,
        small && commonStyles.smallButton,
        className,
      ])}
      title={title ?? text}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={icon} size={size} color={color} />
      {text}
      {children}
    </button>
  );
};
