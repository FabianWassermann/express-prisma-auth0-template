import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import HttpError from "../errors/HttpError";
import HttpStatusCode from "../errors/HttpStatusCode";

/**
 * Handler to catch `async` operation errors.
 * Reduces having to write `try-catch` all the time.
 */
export const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

/**
 * A basic error handler that contains all important information.
 */
export const errorHandler = (
  err: HttpError,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        err.message = "There is a unique constraint violation.";
        err.status = HttpStatusCode.BAD_REQUEST;
        break;
      default:
        err.message = "Prisma error occurred.";
    }
  }

  err.stack = err.stack || "";
  const status = err.status || HttpStatusCode.INTERNAL_SERVER_ERROR;
  const error = { message: err.message };
  console.log(err);
  res.status(status);
  res.json({ status, error });
};
