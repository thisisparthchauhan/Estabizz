import "server-only";

import { PrismaClient } from "@prisma/client";

const globalForJobsPrisma = globalThis as typeof globalThis & {
  jobsPrisma?: PrismaClient;
};

export function getJobsPrismaClient(): PrismaClient {
  if (!globalForJobsPrisma.jobsPrisma) {
    globalForJobsPrisma.jobsPrisma = new PrismaClient();
  }

  return globalForJobsPrisma.jobsPrisma;
}
