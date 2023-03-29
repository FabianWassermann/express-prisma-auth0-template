import { NextFunction, Request, Response } from "express";
import { JWTPayload } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import HttpError from "../errors/HttpError";
import HttpStatusCode from "../errors/HttpStatusCode";
import {
  IGetUserIdRequest,
  IGetUserPermissionRequest,
} from "../types/RequestTypes";

interface IPermissionJwtPayload extends JWTPayload {
  permissions: string[];
}

export default (req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next();

  if (!req.headers["authorization"])
    return next(
      new HttpError(HttpStatusCode.UNAUTHORIZED, "Set a authorization header!")
    );

  const token = req.headers["authorization"].split(" ")[1];
  const auth0Data = jwt.decode(token);

  if (!auth0Data)
    return next(
      new HttpError(
        HttpStatusCode.UNAUTHORIZED,
        "Set a valid jwt token as authorization header!"
      )
    );

  console.log(auth0Data);

  (<IGetUserPermissionRequest>req).userPermissions = (<IPermissionJwtPayload>(
    auth0Data
  )).permissions;
  (<IGetUserIdRequest>req).userId = (<string>auth0Data.sub).split("|")[1];
  next();
};
