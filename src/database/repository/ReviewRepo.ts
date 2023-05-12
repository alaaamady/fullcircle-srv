import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a driver review
export const createDriverReview = async (req: Request, res: Response) => {
  const {
    pickupConvenience,
    donorDestination,
    packaging,
    additionalNotes,
    type,
    correctAddress,
    driverId,
    recipientId,
    donorId,
  } = req.body;

  try {
    const newReview = await prisma.driverReview.create({
      data: {
        pickupConvenience,
        donorDestination,
        packaging,
        additionalNotes,
        type,
        correctAddress,
        driver: { connect: { id: driverId } },
        recipient: { connect: { id: recipientId } },
        donor: { connect: { id: donorId } },
      },
    });

    res.json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating driver review");
  }
};

// Create a recipient review
export const createRecipientReview = async (req: Request, res: Response) => {
  const {
    deliveredWell,
    additionalNotes,
    fitCategory,
    preferredCategory,
    quantityEnough,
    servingsCount,
    driverId,
    recipientId,
    donorId,
  } = req.body;

  try {
    const newReview = await prisma.recipientReview.create({
      data: {
        deliveredWell,
        additionalNotes,
        fitCategory,
        preferredCategory,
        quantityEnough,
        servingsCount,
        driver: { connect: { id: driverId } },
        recipient: { connect: { id: recipientId } },
        donor: { connect: { id: donorId } },
      },
    });

    res.json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating recipient review");
  }
};

// Create a donor review
export const createDonorReview = async (req: Request, res: Response) => {
  const { safetyCheck, additionalNotes, driverId, recipientId, donorId } =
    req.body;

  try {
    const newReview = await prisma.donorReview.create({
      data: {
        safetyCheck,
        additionalNotes,
        driver: { connect: { id: driverId } },
        recipient: { connect: { id: recipientId } },
        donor: { connect: { id: donorId } },
      },
    });

    res.json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating donor review");
  }
};
