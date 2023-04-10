import { PrismaClient } from "@prisma/client";
import Logger from "../core/Logger";

const prisma = new PrismaClient();

// Connect to the database
prisma
  .$connect()
  .then(() => {
    Logger.info("Prisma connection done");
  })
  .catch((e) => {
    Logger.info("Prisma connection error");
    Logger.error(e);
  });

// CONNECTION EVENTS
// If the Node process ends, disconnect the Prisma client
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  Logger.info("Prisma connection disconnected through app termination");
  process.exit(0);
});

export default prisma;
