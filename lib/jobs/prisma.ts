import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForJobsPrisma = globalThis as typeof globalThis & {
  jobsPrisma?: PrismaClient;
};

export function getJobsPrismaClient(): PrismaClient {
  if (!globalForJobsPrisma.jobsPrisma) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error("DATABASE_URL is required for Estabizz Jobs PostgreSQL access.");
    }

    const adapter = new PrismaPg({ connectionString });
    globalForJobsPrisma.jobsPrisma = new PrismaClient({ adapter });
  }

  return globalForJobsPrisma.jobsPrisma;
}
