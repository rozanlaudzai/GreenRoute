import { TripCalculator } from '@/components/trip-calculator';

export default function TripsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 pt-10 lg:px-8">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-700">Trip calculator</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Compare transportation impact</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Use our calculator to choose the most eco-friendly way to get around.</p>
      </div>
      <TripCalculator />
    </section>
  );
}
