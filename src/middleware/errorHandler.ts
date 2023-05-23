import { type NextFunction, type Request, type Response } from "express";
import { type HttpError } from "../interfaces/interface";

import { logEvents } from "./logEvents";

const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = err.status ?? 500;
  void logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  res.status(status).json({ message: err.message });
};

export default errorHandler;
