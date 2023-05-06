import express, { Request, Response } from "express";
import {
  createRecipient,
  getRecipientById,
  updateRecipient,
  deleteRecipient,
  getAllRecipients,
} from "../../database/repository/RecipientRepo";

const router = express.Router();

// Create a new recipient
router.post("", async (req: Request, res: Response) => {
  try {
    const newRecipient = await createRecipient(req.body);
    res.json(newRecipient);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating recipient");
  }
});

router.get("", async (req: Request, res: Response) => {
  try {
    const donations = await getAllRecipients();
    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a recipient by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const recipientId = parseInt(req.params.id);
    const recipient = await getRecipientById(recipientId);
    if (recipient) {
      res.json(recipient);
    } else {
      res.status(404).send("Recipient not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting recipient");
  }
});

// Update a recipient by ID
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const recipientId = parseInt(req.params.id);
    const updatedRecipient = await updateRecipient(recipientId, req.body);
    res.json(updatedRecipient);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating recipient");
  }
});

// DELETE /recipients/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const recipientId = parseInt(req.params.id);

  try {
    const deletedRecipient = await deleteRecipient(recipientId);
    res.status(200).json(deletedRecipient);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete recipient." });
  }
});

export default router;