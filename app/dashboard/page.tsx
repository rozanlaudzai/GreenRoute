import { MetricCard } from '@/components/metric-card';
import { Card } from '@/components/ui/card';
import { LineGraph } from '@/components/charts/line-graph';
import { PieSummary } from '@/components/charts/pie-summary';

const trafficData = [
  { date: 'Mon', value: 24 },
  { date: 'Tue', value: 32 },
  { date: 'Wed', value: 28 },
  { date: 'Thu', value: 34 },
  { date: 'Fri', value: 40 },
  { date: 'Sat', value: 38 },
  { date: 'Sun', value: 30 }
];

const savingsData = [
  { date: 'Jan', value: 80 },
  { date: 'Feb', value: 95 },
  { date: 'Mar', value: 104 },
  { date: 'Apr', value: 118 },
  { date: 'May', value: 133 }
];

const breakdownData = [
  { name: 'Bus', value: 35 },
  { name: 'Train', value: 30 },
  { name: 'Bike', value: 20 },
  { name: 'Walk', value: 15 }
];

export default function DashboardPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 pt-10 lg:px-8">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-brand-700">Dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">Your sustainability impact</h1>
          <p className="mt-3 max-w-2xl text-slate-600">Track trips, savings, and momentum across fuel-free travel and campus commuting.</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total trips" value="142" description="Trips logged across modes." />
        <MetricCard label="CO₂ saved" value="2,850 kg" description="Compared to car travel." />
        <MetricCard label="Average green score" value="87" description="Your sustainability rating." />
        <MetricCard label="Challenges complete" value="5" description="Milestones unlocked." />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_0.7fr]">
        <LineGraph data={trafficData} label="Weekly eco trips" color="#16a34a" />
        <PieSummary data={breakdownData} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold text-slate-900">Monthly greenhouse savings</h2>
          <div className="mt-5">
            <LineGraph data={savingsData} label="CO₂ avoided (kg)" color="#059669" />
          </div>
        </Card>
        <Card className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Recent trips</h2>
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Campus → Library</p>
              <p className="mt-1 text-sm text-slate-600">Bus · 12 min · 0.24 kg CO₂</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Downtown → Park</p>
              <p className="mt-1 text-sm text-slate-600">Train · 9 min · 0.14 kg CO₂</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
