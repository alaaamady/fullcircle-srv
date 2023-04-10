import express from "express";
import { BadRequestError } from "../../core/ApiError";
import prisma from "../../database";
import asyncHandler from "../../helpers/asyncHandler";
import validator from "../../helpers/validator";
import schema from "./schema";
import crypto from "crypto";
import bcrypt from "bcrypt";

const router = express.Router();

router.post(
  "/basic",
  validator(schema.signup),
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (user) throw new BadRequestError("User already registered");

    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto.randomBytes(64).toString("hex");
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const createdUser = await prisma.user.create({
      data: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: passwordHash,
        phoneNumber: req.body.phoneNumber,
        profile_picture_url: req.body.profilePictureURL,
        address: req.body.address,
        age: req.body.age,
        gender: req.body.gender,
      },
    });
  })
);
