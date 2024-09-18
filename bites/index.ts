import express from "express";
import restaurantRouter from "./routes/restaurant.js";
import cuisinesRouter from "./routes/cuisines.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const PORT = process.env.PORT || 7000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/restaurant", restaurantRouter);
app.use("/cuisines", cuisinesRouter);

// Middleware will always be used in the last.
app.use(errorHandler)

app
  .listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })
  .on("error", (err) => {
    throw new Error(err.message);
  });
