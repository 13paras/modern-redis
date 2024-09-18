import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import {
  RestaurantSchema,
  type Restaurant,
} from "../schemas/restaurant.schema.js";
import { initializeRedisClient } from "../utils/client.js";
import { nanoid } from "nanoid";
import { restaurantKeyById } from "../utils/keys.js";
import { successResposne } from "../utils/responses.js";
import type { Request } from "express";
import { checkRestaurantId } from "../middlewares/checkRestaurantId.js";

const router = Router();

router.post("/", validate(RestaurantSchema), async (req, res, next) => {
  const data = req.body as Restaurant;

  try {
    const client = await initializeRedisClient();
    const id = nanoid();
    const restaurantKey = restaurantKeyById(id);
    console.log({ restaurantKey });

    const hashData = {
      id,
      name: data.name,
      location: data.location,
    };
    console.log(hashData);

    const addResult = await client.hSet(restaurantKey, hashData);
    console.log(`Added ${addResult} fields`);
    return successResposne(res, hashData, "Added new Restaurant");
  } catch (error) {
    // sending the error to the error handler (which is defined in the middlewares)
    next(error);
  }
});

router.get(
  "/:restaurantID",
  checkRestaurantId,
  async (req: Request<{ restaurantID: string }>, res, next) => {
    const { restaurantID } = req.params;
    console.log(restaurantID);
    try {
      const client = await initializeRedisClient();
      const restaurantKey = restaurantKeyById(restaurantID);
      console.log({ restaurantKey });
      // const restaurant = await client.hGetAll(restaurantKey);

      //* Here, The viewCount is used to track how many times a restaurant’s details have been viewed. Each time the endpoint is accessed, the viewCount is incremented by 1. This can be useful for analytics, such as understanding the popularity of different restaurants.
      const [viewCount, restaurant] = await Promise.all([
        client.hIncrBy(restaurantKey, "viewCount", 1),
        client.hGetAll(restaurantKey),
      ]);
      console.log(viewCount);
      return successResposne(res, restaurant, "Restaurant details");
    } catch (error) {
      next(error);
    }
  }
);

export default router;