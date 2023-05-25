import { PrismaClient, Donation, FoodCategory } from "@prisma/client";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const prisma = new PrismaClient();

// Create a new donation
async function createDonation(
  title: string,
  category: FoodCategory,
  latitude: number,
  longitude: number,
  pickUpTimestampStart: Date,
  pickUpTimestampEnd: Date,
  expiryDate: Date,
  description: string,
  userId: string,
  pictures: Express.Multer.File[],
  area: string
): Promise<Donation> {
  const pictureUrls = await Promise.all(
    pictures.map(async (file) => {
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
  const donation = await prisma.donation.create({
    data: {
      area,
      title,
      category,
      latitude,
      longitude,
      pickUpTimestampStart,
      pickUpTimestampEnd,
      expiryDate,
      description,
      user: {
        connect: {
          id: userId,
        },
      },
      pictures: {
        create: pictureUrls.map((url) => ({ url })),
      },
    },
    include: {
      pictures: true,
    },
  });
  return donation;
}
// Get a single donation by ID
async function getDonationById(id: number): Promise<Donation | null> {
  const donation = await prisma.donation.findUnique({
    where: { id },
    include: {
      pictures: true,
    },
  });
  return donation;
}

// Get a list of all donations
async function getAllDonations(): Promise<Donation[]> {
  const donations = await prisma.donation.findMany({
    include: {
      pictures: true,
    },
  });
  return donations;
}

// Update an existing donation by ID
async function updateDonation(
  id: number,
  data: {
    title?: string;
    category?: FoodCategory;
    latitude?: number;
    longitude?: number;
    pickUpTimestampStart: Date;
    pickUpTimestampEnd: Date;
    expiryDate?: Date;
    description?: string;
    userId?: string;
    pictures?: string[];
    area: string;
  }
): Promise<Donation | null> {
  const donation = await prisma.donation.update({
    where: { id },
    data: {
      area: data.area,
      title: data.title,
      category: data.category,
      latitude: data.latitude,
      longitude: data.longitude,
      pickUpTimestampStart: data.pickUpTimestampStart,
      pickUpTimestampEnd: data.pickUpTimestampEnd,
      expiryDate: data.expiryDate,
      description: data.description,
      userId: data.userId,
      pictures: {
        create: data.pictures?.map((url) => ({ url })),
      },
    },
    include: {
      pictures: true,
    },
  });
  return donation;
}

// Delete an existing donation by ID
async function deleteDonation(id: number): Promise<any[] | null> {
  const deletePictures = prisma.picture.deleteMany({
    where: {
      donationId: id,
    },
  });
  const deleteDonation = prisma.donation.delete({
    where: { id: id },
  });
  const transaction = await prisma.$transaction(async (prisma) => {
    const results = await Promise.all([deletePictures, deleteDonation]);
    return results.flat();
  });

  return transaction;
}

export {
  createDonation,
  getDonationById,
  getAllDonations,
  updateDonation,
  deleteDonation,
};
