'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const travelModes = [
  { mode: 'WALKING', label: 'Walking', cost: 0, speed: 5, score: 100 },
  { mode: 'BICYCLE', label: 'Bicycle', cost: 0, speed: 15, score: 100 },
  { mode: 'MOTORCYCLE', label: 'Motorcycle', cost: 8000, speed: 40, score: 60 },
  { mode: 'CAR', label: 'Car', cost: 18000, speed: 35, score: 40 },
  { mode: 'BUS', label: 'Bus', cost: 4000, speed: 30, score: 85 },
  { mode: 'TRAIN', label: 'Train', cost: 7000, speed: 45, score: 90 }
];

const emissionFactors: Record<string, number> = {
  WALKING: 0,
  BICYCLE: 0,
  MOTORCYCLE: 0.08,
  CAR: 0.2,
  BUS: 0.02,
  TRAIN: 0.015
};

interface Result {
  label: string;
  mode: string;
  duration: number;
  cost: number;
  co2: number;
  score: number;
}

export function TripCalculator() {
  const [origin, setOrigin] = useState('Campus');
  const [destination, setDestination] = useState('City Center');
  const [distance, setDistance] = useState('6');

  const results: Result[] = useMemo(() => {
    const km = Math.max(0, Number(distance) || 0);
    return travelModes.map((option) => {
      const duration = km > 0 ? Math.round((km / option.speed) * 60) : 0;
      const co2 = Number((km * emissionFactors[option.mode]).toFixed(2));
      return {
        label: option.label,
        mode: option.mode,
        duration,
        cost: km * option.cost,
        co2,
        score: option.score
      };
    });
  }, [distance]);

  const best = useMemo(() => {
    return results.reduce((winner, option) => {
      if (!winner || option.co2 < winner.co2) return option;
      return winner;
    }, results[0]);
  }, [results]);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-brand-700">Trip comparison</p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900">Choose the greenest route</h1>
              <p className="mt-3 text-slate-600">Enter your start, end, and distance to compare travel options instantly.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input value={origin} onChange={(event) => setOrigin(event.target.value)} placeholder="Origin" />
              <Input value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Destination" />
              <Input
                type="number"
                value={distance}
                onChange={(event) => setDistance(event.target.value)}
                placeholder="Distance in km"
              />
            </div>
          </div>
        </Card>
        <Card className="space-y-4 bg-emerald-50">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-emerald-700">Best option</p>
          <div className="space-y-3">
            <p className="text-2xl font-semibold text-slate-900">{best?.label}</p>
            <p className="text-slate-600">Estimated CO₂: {best?.co2} kg</p>
            <p className="text-slate-600">Travel time: {best?.duration} min</p>
            <p className="text-slate-600">Cost: Rp{best?.cost.toLocaleString()}</p>
          </div>
          <Badge variant="success">Greenest route</Badge>
        </Card>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-700">
                <th className="px-4 py-3">Mode</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Cost</th>
                <th className="px-4 py-3">CO₂</th>
                <th className="px-4 py-3">Green Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {results.map((item) => (
                <tr key={item.mode} className={item.mode === best?.mode ? 'bg-emerald-50' : ''}>
                  <td className="px-4 py-4 font-semibold text-slate-900">{item.label}</td>
                  <td className="px-4 py-4 text-slate-600">{item.duration} min</td>
                  <td className="px-4 py-4 text-slate-600">Rp{item.cost.toLocaleString()}</td>
                  <td className="px-4 py-4 text-slate-600">{item.co2} kg</td>
                  <td className="px-4 py-4 text-slate-600">{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
