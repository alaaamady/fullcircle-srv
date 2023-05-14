import { OrganizationType, PrismaClient, Recipient } from "@prisma/client";
import AWS from "aws-sdk";

const prisma = new PrismaClient();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

async function createRecipient(recipient: {
  logo: Express.Multer.File;
  name: string;
  type: OrganizationType;
  pictures: Express.Multer.File[];
  amountOfPeople: number;
  bio: string;
  userId: string;
  longitude: number;
  latitude: number;
}): Promise<Recipient> {
  const pictureUrls = await Promise.all(
    recipient.pictures.map(async (file) => {
      const filename = `${Date.now()}-${file.originalname}`;
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename,
        Body: file.buffer,
      };
      const { Location } = await s3.upload(params).promise();
      return Location;
    })
  );
  
  const logoUrl = await uploadFileToS3(recipient.logo);
  
  return prisma.recipient.create({
    data: {
      name: recipient.name,
      type: recipient.type,
      amountOfPeople: recipient.amountOfPeople,
      bio: recipient.bio,
      pictures: {
        create: pictureUrls.map((url) => ({ url })),
      },
      logo: logoUrl,
      longitude: recipient.longitude,
      latitude: recipient.latitude,
      userId: recipient.userId
    },
  });
}

async function uploadFileToS3(file: Express.Multer.File): Promise<string> {
  const filename = `${Date.now()}-${file.originalname}`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
    Body: file.buffer,
  };
  const { Location } = await s3.upload(params).promise();
  return Location;
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
