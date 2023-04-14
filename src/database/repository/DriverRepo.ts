import { PrismaClient, Driver } from "@prisma/client";

const prisma = new PrismaClient();

async function createDriver(driver: Omit<Driver, "id">): Promise<Driver> {
  return prisma.driver.create({
    data: driver,
  });
}

async function getDriverById(id: number): Promise<Driver | null> {
  return prisma.driver.findUnique({
    where: {
      id,
    },
  });
}

async function updateDriver(
  id: number,
  driver: Partial<Driver>
): Promise<Driver | null> {
  return prisma.driver.update({
    where: {
      id,
    },
    data: driver,
  });
}

async function deleteDriver(id: number): Promise<Driver | null> {
  return prisma.driver.delete({
    where: {
      id,
    },
  });
}

export { createDriver, getDriverById, updateDriver, deleteDriver };
