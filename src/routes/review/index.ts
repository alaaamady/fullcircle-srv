import express from "express";
import {
  createDriverReview,
  createRecipientReview,
  createDonorReview,
} from "../../database/repository/ReviewRepo";

const router = express.Router();

// Create a driver review
router.post("/driver", createDriverReview);

// Create a recipient review
router.post("/recipient", createRecipientReview);

// Create a donor review
router.post("/donor", createDonorReview);

export default router;
