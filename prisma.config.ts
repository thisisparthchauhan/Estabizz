// Prisma 7 keeps connection URL handling in this config file instead of
// prisma/schema.prisma. Keep real DATABASE_URL values in local/Vercel env only.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
