import { ReactNode } from 'react';

interface ProgressProps {
  value: number;
  label?: string;
  className?: string;
}

export function Progress({ value, label, className = '' }: ProgressProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label ? <div className="text-sm font-medium text-slate-700">{label}</div> : null}
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  );
}
