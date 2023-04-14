import express, { Request, Response } from "express";
import {
  createOneSafetyCheck,
  getOneSafetyCheckById,
} from "../../database/repository/SafetyCheckRepo";

const router = express.Router();

// Create a new safety check
router.post("", async (req: Request, res: Response) => {
  try {
    const newSafetyCheck = await createOneSafetyCheck(req.body);
    res.status(201).json(newSafetyCheck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a safety check by ID
router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const safetyCheck = await getOneSafetyCheckById(id);
    if (!safetyCheck) {
      res.status(404).json({ message: "Safety check not found" });
    } else {
      res.json(safetyCheck);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
