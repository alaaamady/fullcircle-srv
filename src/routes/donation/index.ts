import express, { Request, Response } from "express";
import {
  createDonation,
  getDonationById,
  getAllDonations,
  updateDonation,
  deleteDonation,
} from "../../database/repository/DonationRepo";
import multer, { Multer } from "multer";

const router = express.Router();

// Create a new donation
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a new donation
router.post("", upload.array("pictures"), async (req, res) => {
  try {
    const {
      title,
      category,
      latitude,
      longitude,
      pickUpTimestampStart,
      pickUpTimestampEnd,
      expiryDate,
      description,
      userId,
      area
    } = req.body;

    const pictures = req.files as Express.Multer.File[];

    const donation = await createDonation(
      title,
      category,
      Number(latitude),
      Number(longitude),
      new Date(pickUpTimestampStart),
      new Date(pickUpTimestampEnd),
      new Date(expiryDate),
      description,
      userId,
      pictures,
      area
    );

    res.status(201).json(donation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Get a single donation by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const donation = await getDonationById(id);

    if (donation === null) {
      res.status(404).json({ error: "Not found" });
    } else {
      res.json(donation);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a list of all donations
router.get("", async (req: Request, res: Response) => {
  try {
    const donations = await getAllDonations();
    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update an existing donation by ID
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const {
      title,
      category,
      latitude,
      longitude,
      pickUpTimestampStart,
      pickUpTimestampEnd,
      expiryDate,
      description,
      userId,
      pictures,
      area
    } = req.body;

    const donation = await updateDonation(id, {
      title,
      category,
      latitude,
      longitude,
      pickUpTimestampStart,
      pickUpTimestampEnd,
      expiryDate,
      description,
      userId,
      pictures,
      area
    });

    if (donation === null) {
      res.status(404).json({ error: "Not found" });
    } else {
      res.json(donation);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete an existing donation by ID
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const donation = await deleteDonation(id);

    if (donation === null) {
      res.status(404).json({ error: "Not found" });
    } else {
      res.json(donation);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
