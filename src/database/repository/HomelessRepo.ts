import { PrismaClient, Homeless } from "@prisma/client";

const prisma = new PrismaClient();

async function createHomeless(
  homeless: Omit<Homeless, "id">
): Promise<Homeless> {
  return prisma.homeless.create({
    data: homeless,
  });
}

async function getHomelessById(id: number): Promise<Homeless | null> {
  return prisma.homeless.findUnique({
    where: {
      id,
    },
  });
}

async function updateHomeless(
  id: number,
  homeless: Partial<Homeless>
): Promise<Homeless | null> {
  return prisma.homeless.update({
    where: {
      id,
    },
    data: homeless,
  });
}

async function deleteHomeless(id: number): Promise<Homeless | null> {
  return prisma.homeless.delete({
    where: {
      id,
    },
  });
}

async function getAllHomeless(): Promise<Homeless[]> {
  return prisma.homeless.findMany();
}

async function incrementConfirmations(id: number) {
  return prisma.homeless.update({
    where: {
      id: id,
    },
    data: {
      confirmations: {
        increment: 1,
      },
    },
  });
}

export {
  createHomeless,
  getHomelessById,
  updateHomeless,
  deleteHomeless,
  getAllHomeless,
  incrementConfirmations,
};
