import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'quiet';
  fullWidth?: boolean;
};

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const classes = [
    'button',
    'button--' + variant,
    fullWidth ? 'button--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}
