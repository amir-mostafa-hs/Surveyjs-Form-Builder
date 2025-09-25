import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

import connectDB from "./config/db.js";
import formsRouter from "./routes/forms.js";
import responsesRouter from "./routes/responses.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

// اتصال به MongoDB
connectDB();

// میدلورها
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 200,
  })
);

// routes
app.use("/api/forms", formsRouter);
app.use("/api/responses", responsesRouter);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
