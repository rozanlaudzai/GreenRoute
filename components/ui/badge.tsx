import { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning';
  children: ReactNode;
}

export function Badge({ variant = 'default', children }: BadgeProps) {
  const base = 'inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold';
  const style =
    variant === 'success'
      ? 'bg-emerald-100 text-emerald-800'
      : variant === 'warning'
      ? 'bg-amber-100 text-amber-900'
      : 'bg-slate-100 text-slate-700';

  return <span className={`${base} ${style}`}>{children}</span>;
}
