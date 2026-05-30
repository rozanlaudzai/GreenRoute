import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const adminStats = [
  { label: 'Active users', value: '1,820' },
  { label: 'Challenges live', value: '12' },
  { label: 'Total emissions saved', value: '15,400 kg' }
];

export default function AdminPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 pt-10 lg:px-8">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-700">Admin</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Platform management</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Manage users, challenges, emissions, and platform insights from one dashboard.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {adminStats.map((stat) => (
          <Card key={stat.label}>
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{stat.value}</p>
          </Card>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Challenge management</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Create, update, and review goals</h2>
            </div>
            <Badge>Admin</Badge>
          </div>
          <p className="mt-4 text-slate-600">Manage challenge statuses and reward settings to keep campus users engaged.</p>
        </Card>
        <Card>
          <div>
            <p className="text-sm text-slate-500">Emission factors</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Configure sustainable metrics</h2>
            <p className="mt-4 text-slate-600">Update carbon output values for each travel mode in the system.</p>
          </div>
        </Card>
      </div>
    </section>
  );
}
