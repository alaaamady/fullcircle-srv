import express, { Request, Response } from "express";
import {
  createDriver,
  getDriverById,
  updateDriver,
  deleteDriver,
} from "../../database/repository/DriverRepo";

const router = express.Router();

// Create a new driver
router.post("/", async (req: Request, res: Response) => {
  try {
    const newDriver = await createDriver(req.body);
    res.json(newDriver);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating driver");
  }
});

// Get a driver by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const driverId = parseInt(req.params.id);
    const driver = await getDriverById(driverId);
    if (driver) {
      res.json(driver);
    } else {
      res.status(404).send("Driver not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting driver");
  }
});

// Update a driver by ID
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const driverId = parseInt(req.params.id);
    const updatedDriver = await updateDriver(driverId, req.body);
    res.json(updatedDriver);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating driver");
  }
});

// DELETE /drivers/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const driverId = parseInt(req.params.id);

  try {
    const deletedDriver = await deleteDriver(driverId);
    res.status(200).json(deletedDriver);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete driver." });
  }
});

export default router;
