import { PrismaClient, SafetyCheck } from "@prisma/client";

const prisma = new PrismaClient();

async function createOneSafetyCheck(
  safetyCheckData: Omit<SafetyCheck, "id">
): Promise<SafetyCheck> {
  const safetyCheck = await prisma.safetyCheck.create({
    data: safetyCheckData,
  });
  return safetyCheck;
}

async function getOneSafetyCheckById(
  safetyCheckId: number
): Promise<SafetyCheck | null> {
  const safetyCheck = await prisma.safetyCheck.findUnique({
    where: {
      id: safetyCheckId,
    },
  });
  return safetyCheck;
}

export { createOneSafetyCheck, getOneSafetyCheckById };
