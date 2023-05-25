import express, { Request, Response } from "express";
import {
  createDriver,
  getDriverById,
  updateDriver,
  deleteDriver,
  getAllDrivers,
} from "../../database/repository/DriverRepo";
import multer, { Multer } from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

//vehicle photo - inspection report - driver license
// Create a new driver
router.post(
  "/",
  upload.fields([
    { name: "registrationCertificate", maxCount: 1 },
    { name: "licensePlate", maxCount: 1 },
    { name: "photos", maxCount: 10 },
    { name: "vehicleInspictionReport", maxCount: 1 },
    { name: "driverLicense", maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    try {
      const { carType, carMake, carModel, manufactureYear, color, userId, status } = req.body;
      const registrationCertificate = req.files["registrationCertificate"][0] as Express.Multer.File;
      const licensePlate = req.files["licensePlate"][0] as Express.Multer.File;
      const photos = req.files["photos"] as Express.Multer.File[];
      const vehicleInspictionReport = req.files["vehicleInspictionReport"][0] as Express.Multer.File;
      const driverLicense = req.files["driverLicense"][0] as Express.Multer.File;
      const newDriver = await createDriver({carMake, carModel, carType, color, driverLicense, licensePlate, manufactureYear, vehicleInspictionReport, registrationCertificate, userId, photos, status});
      res.json(newDriver);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error creating driver");
    }
  }
);

router.get("", async (req: Request, res: Response) => {
  try {
    const drivers = await getAllDrivers();
    res.json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting drivers" });
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
