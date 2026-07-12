import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

app.get("/api/v1/health", (req, res) => {
  res.json({
    success: true,
    message: "AssetFlow API Running",
  });
});

app.use(errorHandler);

export default app;