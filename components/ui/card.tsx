import { ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
}

export function Card({ className = '', children }: CardProps) {
  return (
    <div className={`rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card ${className}`}>
      {children}
    </div>
  );
}
