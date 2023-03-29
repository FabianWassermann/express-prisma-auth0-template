import express, { Request, Response } from "express";
import { asyncHandler } from "../middleware/errorMiddleware";
import HttpError from "../errors/HttpError";
import prisma from "../prismaClient";
import HttpStatusCode from "../errors/HttpStatusCode";
import { IGetUserIdRequest } from "../types/RequestTypes";
import { requiredPermissions } from "../middleware/permissionsMiddelware";

const router = express.Router();

const checkPermissions = requiredPermissions(["read:users"]);

router.get(
  "/",
  checkPermissions,
  asyncHandler(async (req: IGetUserIdRequest, res: Response) => {
    const users = await prisma.user.findMany({});

    console.log(req.userId);

    res.status(HttpStatusCode.CREATED).json(users);
  })
);

router.post(
  "/",
  asyncHandler(async (req: IGetUserIdRequest, res: Response) => {
    console.log(req.userId);
    const users = await prisma.user.create({ data: { id: req.userId } });

    res.status(HttpStatusCode.CREATED).json(users);
  })
);

export default router;
