import express, { Request, Response } from "express";
import apikey from "../auth/apikey";
import permission from "../helpers/permission";
import prisma from "../database";
import asyncHandler from "../helpers/asyncHandler";
import { SuccessResponse } from "../core/ApiResponse";
import { InternalError } from "../core/ApiError";
import donation from "./donation";
import safetyCheck from "./safety-check";
import driver from "./driver";
import recipient from "./recipient";
export enum Permission {
  GENERAL = "GENERAL",
}

const router = express.Router();

/*---------------------------------------------------------*/
// router.use(apikey);
/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
// router.use(permission(Permission.GENERAL));
/*---------------------------------------------------------*/

// HEALTH CHECK
router.use(
  "/health",
  router.get(
    "/health",
    asyncHandler(async (req: Request, res: Response) => {
      const date = await prisma.$queryRaw`SELECT NOW();`;
      if (!date) throw new InternalError();
      new SuccessResponse("API HEALTHY", date).send(res);
    })
  )
);

// DONATION
router.use("/donation", donation);
router.use("/safety-check", safetyCheck);
router.use("/driver", driver);
router.use("/recipient", recipient);
export default router;
