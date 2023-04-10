import express, { Request, Response } from "express";
import apikey from "../auth/apikey";
import permission from "../helpers/permission";
import prisma from "../database";
import asyncHandler from "../helpers/asyncHandler";
import { SuccessResponse } from "../core/ApiResponse";
import { InternalError } from "../core/ApiError";

export enum Permission {
  GENERAL = "GENERAL",
}

const router = express.Router();

router.get(
  "/health",
  asyncHandler(async (req: Request, res: Response) => {
    console.log("BEGINNING");
    const date = await prisma.$queryRaw`SELECT NOW();`;
    console.log(date);
    if (!date) throw new InternalError();
    new SuccessResponse("API HEALTHY", date).send(res);
  })
);
/*---------------------------------------------------------*/
router.use(apikey);
/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
router.use(permission(Permission.GENERAL));
/*---------------------------------------------------------*/
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

export default router;
