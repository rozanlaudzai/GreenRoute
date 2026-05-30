import { Card } from '@/components/ui/card';

const leaders = [
  { name: 'Sita', campus: 'Central Campus', score: 98, saved: 186 },
  { name: 'Rafi', campus: 'North Campus', score: 92, saved: 154 },
  { name: 'Anna', campus: 'Downtown', score: 88, saved: 132 }
];

export default function LeaderboardPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 pt-10 lg:px-8">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-700">Leaderboard</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Top eco commuters</h1>
        <p className="mt-3 max-w-2xl text-slate-600">See who is leading by emissions saved, green score, and challenge progress.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {leaders.map((leader, index) => (
          <Card key={leader.name}>
            <p className="text-sm text-slate-500">Rank {index + 1}</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">{leader.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{leader.campus}</p>
            <div className="mt-6 space-y-2 text-sm text-slate-700">
              <p>Green score: {leader.score}</p>
              <p>CO₂ saved: {leader.saved} kg</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
