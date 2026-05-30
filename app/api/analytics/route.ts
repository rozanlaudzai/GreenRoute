import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const totalUsers = await prisma.user.count();
  const totalTrips = await prisma.trip.count();
  const totalEmissions = await prisma.trip.aggregate({ _sum: { co2Kg: true } });

  return NextResponse.json({
    totalUsers,
    totalTrips,
    totalEmissions: totalEmissions._sum.co2Kg ?? 0,
    equivalentTrees: Math.round((totalEmissions._sum.co2Kg ?? 0) / 21)
  });
}
