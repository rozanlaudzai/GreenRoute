import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const leaderboard = await prisma.leaderboardEntry.findMany({
    include: { user: true },
    orderBy: { emissionsSaved: 'desc' }
  });
  return NextResponse.json({ leaderboard });
}
