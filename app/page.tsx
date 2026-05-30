import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const features = [
  {
    title: 'Compare transportation options',
    description: 'Assess time, cost, and emissions for walking, cycling, car, bus, train, and motorcycle.'
  },
  {
    title: 'Track your impact',
    description: 'Save every trip and watch your emissions, green score, and monthly trends improve.'
  },
  {
    title: 'Join eco challenges',
    description: 'Earn badges and get motivation through curated sustainability goals.'
  }
];

const stats = [
  { label: 'Total CO₂ saved', value: '12,580 kg' },
  { label: 'Green trips logged', value: '4,200' },
  { label: 'Active users', value: '1,800+' }
];

export default function HomePage() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 pt-10 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-8">
          <Badge variant="success">Sustainable travel for campus and city life</Badge>
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Choose smarter routes, reduce carbon emissions.
            </h1>
            <p className="text-lg leading-8 text-slate-600">
              Green Route helps you compare transport choices by time, cost, and CO₂ footprint so you can travel with impact in mind.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/trips" className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
              Calculate my impact
            </Link>
            <Link href="/dashboard" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
              View dashboard
            </Link>
          </div>
        </div>
        <div className="space-y-6">
          <Card>
            <div className="space-y-4">
              <p className="text-sm font-medium uppercase text-slate-500">Quick snapshot</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950 px-5 py-6 text-white shadow-card">
                  <p className="text-sm text-slate-300">Bus</p>
                  <p className="mt-4 text-3xl font-semibold">0.2 kg CO₂</p>
                </div>
                <div className="rounded-3xl bg-emerald-50 px-5 py-6 text-emerald-900 shadow-card">
                  <p className="text-sm">Bicycle</p>
                  <p className="mt-4 text-3xl font-semibold">0 kg CO₂</p>
                </div>
              </div>
            </div>
          </Card>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">{stat.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <h2 className="text-xl font-semibold text-slate-900">{feature.title}</h2>
            <p className="mt-3 text-slate-600">{feature.description}</p>
          </Card>
        ))}
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <Card>
          <h2 className="text-2xl font-semibold text-slate-900">How it works</h2>
          <ol className="mt-6 space-y-5 text-slate-600">
            <li>1. Enter your origin, destination, and distance.</li>
            <li>2. Compare walking, cycling, public transit, and ride options.</li>
            <li>3. See CO₂ estimates, cost, travel time, and green score.</li>
          </ol>
        </Card>
        <Card>
          <h2 className="text-2xl font-semibold text-slate-900">Ready to make every trip greener?</h2>
          <p className="mt-4 text-slate-600">
            Save your journeys, join challenges, and unlock impact insights across campus and city routes.
          </p>
        </Card>
      </div>
    </section>
  );
}
