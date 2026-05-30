'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = '', type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
export { Button };
