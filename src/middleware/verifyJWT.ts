import { type NextFunction, type Request, type Response } from "express";
import createHttpError from "http-errors";
import jwt, { type Secret } from "jsonwebtoken";
import { type CustomRequest } from "../interfaces/interface";

const verifyJWT = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization ?? req.headers.Authorization;

    if (typeof authHeader === "string") {
      if (!authHeader?.startsWith("Bearer ")) {
        throw createHttpError.Unauthorized();
      }

      const token = authHeader.split(" ")[1];

      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as Secret,
        (err: any, decoded: any) => {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (err) throw createHttpError.Forbidden();

          (req as CustomRequest).user = decoded?.UserInfo?.username;
          (req as CustomRequest).roles = decoded?.UserInfo?.roles;
          next();
        }
      );
    }
    throw createHttpError.Forbidden();
  } catch (error) {
    next(error);
  }
};

export default verifyJWT;
