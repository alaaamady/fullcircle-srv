import { Response, NextFunction } from "express";
import { ForbiddenError } from "../core/ApiError";
import { PublicRequest } from "../types/app-request";

export default (permission: string) =>
  (req: PublicRequest, res: Response, next: NextFunction) => {
    try {
      console.log(req.apiKey.permissions);
      if (!req.apiKey?.permissions)
        return next(new ForbiddenError("Permission Denied"));

      const exists = req.apiKey.permissions.find(
        (entry) => entry === permission
      );
      console.log("exists", exists);
      if (!exists) return next(new ForbiddenError("Permission Deniedd"));

      next();
    } catch (error) {
      next(error);
    }
  };
