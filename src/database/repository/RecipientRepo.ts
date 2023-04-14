import { PrismaClient, Recipient } from "@prisma/client";

const prisma = new PrismaClient();

async function createRecipient(
  recipient: Omit<Recipient, "id">
): Promise<Recipient> {
  return prisma.recipient.create({
    data: recipient,
  });
}

async function getAllRecipients(): Promise<Recipient[] | null> {
  return prisma.recipient.findMany({});
}

async function getRecipientById(id: number): Promise<Recipient | null> {
  return prisma.recipient.findUnique({
    where: {
      id,
    },
  });
}

async function updateRecipient(
  id: number,
  recipient: Partial<Recipient>
): Promise<Recipient | null> {
  return prisma.recipient.update({
    where: {
      id,
    },
    data: recipient,
  });
}

async function deleteRecipient(id: number): Promise<Recipient | null> {
  return prisma.recipient.delete({
    where: {
      id,
    },
  });
}

export {
  createRecipient,
  getRecipientById,
  updateRecipient,
  deleteRecipient,
  getAllRecipients,
};
