import type { Request, Response, NextFunction } from "express";
import { initializeRedisClient } from "../utils/client.js";
import { restaurantKeyById } from "../utils/keys.js";
import { errorResponse } from "../utils/responses.js";

export const checkRestaurantId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { restaurantID } = req.params;
  if (!restaurantID) {
    return errorResponse(res, 400, "Invalid Restaurant ID");
  }

  const client = await initializeRedisClient();
  const restaurantKey = restaurantKeyById(restaurantID);
  const exists = await client.exists(restaurantKey);
  if (!exists) {
    return errorResponse(res, 404, "Restaurant not found");
  }

  next();
};
