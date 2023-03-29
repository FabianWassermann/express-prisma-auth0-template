import { Request } from "express";

export interface IGetUserIdRequest extends Request {
  userId: string;
}

export interface IGetUserPermissionRequest extends Request {
  userPermissions: string[];
}
