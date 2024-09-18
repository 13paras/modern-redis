import type { Response } from "express";

export function successResposne(
  res: Response,
  data: any,
  message: string = "Success"
) {
  return res.status(200).json({
    success: true,
    data,
    message,
  });
}

export function errorResponse(
  res: Response,
  statusCode: number = 500,
  error: string
) {
  return res.status(statusCode).json({
    success: false,
    error,
  });
}
