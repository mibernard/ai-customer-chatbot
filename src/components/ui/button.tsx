import { cn } from '@/utils/cn';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'ghost';
  size?: 'icon' | 'sm' | 'lg';
}

export const Button = ({ variant = 'outline', size = 'sm', ...props }: ButtonProps) => {
  return (
    <button
      className={cn('px-4 py-2 rounded', variant === 'outline' ? 'border' : '', size === 'sm' ? 'text-sm' : '')}
      {...props}
    />
  );
};
