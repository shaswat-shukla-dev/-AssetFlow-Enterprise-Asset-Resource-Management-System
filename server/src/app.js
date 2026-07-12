import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
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
    res.status(200).json({
        success: true,
        message: "AssetFlow Backend Running Successfully"
    });
});

// ✅ Register all authentication routes
app.use("/api/v1/auth", authRoutes);

// ✅ Error handler should always be last
app.use(errorHandler);

export default app;