import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const challenges = [
  {
    title: 'Walk 10 km this week',
    description: 'Build a walking habit and cut short-trip emissions.',
    progress: 70,
    reward: 'Walker Badge'
  },
  {
    title: 'Use public transport 5 days',
    description: 'Choose bus or train across five commuting days.',
    progress: 40,
    reward: 'Transit Champion'
  },
  {
    title: 'Car-free weekend',
    description: 'Keep your weekend free of private car use.',
    progress: 100,
    reward: 'Eco Weekend Hero'
  }
];

export default function ChallengesPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 pt-10 lg:px-8">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-700">Eco challenges</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Stay motivated with green goals</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Join weekly sustainability challenges and earn badges as you reduce emissions.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {challenges.map((challenge) => (
          <Card key={challenge.title}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{challenge.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{challenge.description}</p>
              </div>
              <Badge variant={challenge.progress === 100 ? 'success' : 'default'}>{challenge.progress === 100 ? 'Complete' : `${challenge.progress}%`}</Badge>
            </div>
            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Reward</p>
              <p className="mt-1 font-semibold text-slate-900">{challenge.reward}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
