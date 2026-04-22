import type { PrismaClient } from '../../generated/prisma/client';
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended';
import { db } from '../../lib/prisma';

vi.mock('../../lib/prisma', () => ({
  db: mockDeep<PrismaClient>(),
}));

export const prismaMock = db as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});
