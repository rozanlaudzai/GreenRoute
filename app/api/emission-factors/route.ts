import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const factors = await prisma.emissionFactor.findMany();
  return NextResponse.json({ factors });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const updates = body.factors as Array<{ mode: string; factor: number }>;

  const updatedFactors = [];
  for (const factor of updates) {
    const updated = await prisma.emissionFactor.upsert({
      where: { mode: factor.mode as any },
      update: { factor: factor.factor },
      create: { mode: factor.mode as any, factor: factor.factor }
    });
    updatedFactors.push(updated);
  }

  return NextResponse.json({ updatedFactors });
}
