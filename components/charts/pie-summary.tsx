'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface PieSummaryProps {
  data: Array<{ name: string; value: number }>; 
}

const colors = ['#16a34a', '#4f46e5', '#f97316', '#0ea5e9'];

export function PieSummary({ data }: PieSummaryProps) {
  return (
    <div className="h-72 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-card">
      <p className="text-sm font-medium text-slate-500">Transportation breakdown</p>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`${value}%`, 'Share']} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
