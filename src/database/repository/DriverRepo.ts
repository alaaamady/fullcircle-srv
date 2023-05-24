import { PrismaClient, Driver } from "@prisma/client";
import AWS from "aws-sdk";

const prisma = new PrismaClient();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

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
async function createDriver(driver: {
  carMake: string;
  carModel: string;
  carType: string;
  color: string;
  driverLicense: Express.Multer.File;
  licensePlate: Express.Multer.File;
  manufactureYear: string;
  vehicleInspictionReport: Express.Multer.File;
  registrationCertificate: Express.Multer.File;
  userId: string;
  photos: Express.Multer.File[];
  verified: boolean;
}): Promise<Driver> {
  const driverLicenseUrl = await uploadFileToS3(driver.driverLicense);
  const licensePlateUrl = await uploadFileToS3(driver.licensePlate);
  const vehicleInspictionReportUrl = await uploadFileToS3(
    driver.vehicleInspictionReport
  );
  const registrationCertificateUrl = await uploadFileToS3(
    driver.registrationCertificate
  );
  const pictureUrls = await Promise.all(
    driver.photos.map(async (file) => {
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
  return prisma.driver.create({
    data: {
      carMake: driver.carMake,
      carModel: driver.carModel,
      carType: driver.carType,
      color: driver.color,
      manufactureYear: driver.manufactureYear,
      userId: driver.userId,
      driverLicense: driverLicenseUrl,
      licensePlate: licensePlateUrl,
      registrationCertificate: registrationCertificateUrl,
      vehicleInspictionReport: vehicleInspictionReportUrl,
      verified: driver.verified,
      photos: pictureUrls,
    },
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
