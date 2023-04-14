import express, { Request, Response } from "express";
import {
  createDonation,
  getDonationById,
  getAllDonations,
  updateDonation,
  deleteDonation,
} from "../../database/repository/DonationRepo";

const router = express.Router();

// Create a new donation
router.post("", async (req: Request, res: Response) => {
  try {
    const {
      title,
      category,
      latitude,
      longitude,
      pickUpTimestamp,
      expiryDate,
      description,
      userId,
      pictures,
    } = req.body;

    const donation = await createDonation(
      title,
      category,
      latitude,
      longitude,
      pickUpTimestamp,
      expiryDate,
      description,
      userId,
      pictures
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
      pickUpTimestamp,
      expiryDate,
      description,
      userId,
      pictures,
    } = req.body;

    const donation = await updateDonation(id, {
      title,
      category,
      latitude,
      longitude,
      pickUpTimestamp,
      expiryDate,
      description,
      userId,
      pictures,
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
