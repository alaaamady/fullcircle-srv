import express, { Request, Response } from "express";
import {
  createHomeless,
  getHomelessById,
  updateHomeless,
  deleteHomeless,
  getAllHomeless,
  incrementConfirmations,
} from "../../database/repository/HomelessRepo";

const router = express.Router();

// Create a new homeless record
router.post("/", async (req: Request, res: Response) => {
  try {
    const newHomeless = await createHomeless(req.body);
    res.json(newHomeless);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating homeless record");
  }
});

// Get a homeless record by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const homelessId = parseInt(req.params.id);
    const homeless = await getHomelessById(homelessId);
    if (homeless) {
      res.json(homeless);
    } else {
      res.status(404).send("Homeless record not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting homeless record");
  }
});

// Update a homeless record by ID
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const homelessId = parseInt(req.params.id);
    const updatedHomeless = await updateHomeless(homelessId, req.body);
    res.json(updatedHomeless);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating homeless record");
  }
});

// DELETE /homeless/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const homelessId = parseInt(req.params.id);

  try {
    const deletedHomeless = await deleteHomeless(homelessId);
    res.status(200).json(deletedHomeless);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete homeless record." });
  }
});

// GET /homeless
router.get("/", async (req: Request, res: Response) => {
  try {
    const allHomeless = await getAllHomeless();
    res.json(allHomeless);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting homeless records");
  }
});

// PUT /homeless/:id/increment-confirmations
router.put(
  "/:id/increment-confirmations",
  async (req: Request, res: Response) => {
    const homelessId = parseInt(req.params.id);

    try {
      const updatedHomeless = await incrementConfirmations(homelessId);
      res.json(updatedHomeless);
    } catch (error) {
      res.status(500).json({
        error: "Unable to increment confirmations for homeless record.",
      });
    }
  }
);

export default router;
