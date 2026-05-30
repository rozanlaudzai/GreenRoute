import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('GreenRoute2026!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@greenroute.local' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@greenroute.local',
      emailVerified: new Date(),
      role: 'ADMIN',
      hashedPassword: adminPassword
    }
  });

  const factors = [
    { mode: 'WALKING', factor: 0.0 },
    { mode: 'BICYCLE', factor: 0.0 },
    { mode: 'MOTORCYCLE', factor: 0.08 },
    { mode: 'CAR', factor: 0.2 },
    { mode: 'BUS', factor: 0.02 },
    { mode: 'TRAIN', factor: 0.015 }
  ];

  for (const factor of factors) {
    await prisma.emissionFactor.upsert({
      where: { mode: factor.mode as any },
      update: { factor: factor.factor },
      create: { mode: factor.mode as any, factor: factor.factor }
    });
  }

  const challenges = [
    {
      title: 'Walk 10 km this week',
      description: 'Build a walking habit and reduce short-route emissions.',
      targetValue: 10,
      unit: 'km',
      reward: 'Walker Badge'
    },
    {
      title: 'Public transport for 5 days',
      description: 'Use bus or train for five separate days.',
      targetValue: 5,
      unit: 'days',
      reward: 'Transit Champion'
    },
    {
      title: 'Car-free weekend',
      description: 'Skip car trips over one full weekend.',
      targetValue: 2,
      unit: 'days',
      reward: 'Eco Weekend Hero'
    }
  ];

  for (const challenge of challenges) {
    await prisma.challenge.upsert({
      where: { title: challenge.title },
      update: challenge,
      create: challenge
    });
  }

  await prisma.leaderboardEntry.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      emissionsSaved: 0,
      greenScoreAverage: 100,
      challengesCompleted: 0,
      campus: 'Global'
    }
  });

  console.log('Database seeded successfully.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
