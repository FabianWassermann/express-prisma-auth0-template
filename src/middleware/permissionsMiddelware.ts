import { NextFunction, Request, Response } from "express";
import HttpError from "../errors/HttpError";
import HttpStatusCode from "../errors/HttpStatusCode";
import { IGetUserPermissionRequest } from "../types/RequestTypes";

const requiredPermissions =
  (permissions: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const userPermissions = (<IGetUserPermissionRequest>req).userPermissions;
    for (let permission of permissions) {
      if (!userPermissions.includes(permission)) {
        next(
          new HttpError(
            HttpStatusCode.FORBIDDEN,
            `You need the permission ${permission} for this action.`
          )
        );
      }
    }
    next();
  };

export { requiredPermissions };
