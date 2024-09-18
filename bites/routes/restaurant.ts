import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import {
  RestaurantSchema,
  type Restaurant,
} from "../schemas/restaurant.schema.js";

const router = Router();

router.post("/", validate(RestaurantSchema), async (req, res) => {
  const data = req.body as Restaurant;
  res.send("Hello World");
});

export default router;
