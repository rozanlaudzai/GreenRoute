import { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  icon?: ReactNode;
  description?: string;
}

export function MetricCard({ label, value, icon, description }: MetricCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
        </div>
        <div className="text-brand-600">{icon}</div>
      </div>
      {description ? <p className="mt-4 text-sm text-slate-500">{description}</p> : null}
    </div>
  );
}
