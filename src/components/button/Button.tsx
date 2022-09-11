import React from 'react';
import cls from 'classnames';
import './Button.less';
export enum ButtonType {
  Primary = 'primary',
  Danger = 'danger',
  Link = 'link',
  Default = 'default',
}
export enum ButtonSize {
  Large = 'lg',
  Medium = 'medium',
  Small = 'sm',
  Default = 'default',
}
export interface ButtonProps {
  children: React.ReactNode;
  btnType?: ButtonType;
  btnSize?: ButtonSize;
  href?: string;
  disabled?: boolean;
  onClick?: (...args: any[]) => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  btnType = ButtonType.Default,
  btnSize = ButtonSize.Default,
  disabled = false,
  href,
  ...rest
}) => {
  const className = cls('btn', `btn-${btnType}`, `btn-${btnSize}`, {
    'btn-disabled': disabled,
  });
  if (btnType === ButtonType.Link) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button disabled={disabled} className={className} {...rest}>
      {children}
    </button>
  );
};
