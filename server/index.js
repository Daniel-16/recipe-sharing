import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import "dotenv/config.js";
import router from "./routes/routes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/api", router);
app.use(errorMiddleware);

const port = process.env.PORT || 7000;
try {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server connected at port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
