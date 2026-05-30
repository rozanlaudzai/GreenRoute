import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const challenges = await prisma.challenge.findMany({ where: { isActive: true }, orderBy: { createdAt: 'asc' } });
  return NextResponse.json({ challenges });
}
