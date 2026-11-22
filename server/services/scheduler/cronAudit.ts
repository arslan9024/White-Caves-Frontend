import { Prisma } from '@prisma/client';
import { prisma } from '../../database.js';

export async function logCronEvent(
  action: string,
  description: string,
  metadata: Record<string, unknown>
): Promise<void> {
  await prisma.activity.create({
    data: {
      type: 'system',
      action,
      description,
      metadata: metadata as unknown as Prisma.InputJsonValue,
    },
  });
}
