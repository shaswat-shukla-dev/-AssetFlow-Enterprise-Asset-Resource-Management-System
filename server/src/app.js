import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import assetCategoryRoutes from "./routes/assetCategory.routes.js";
import vendorRoutes from "./routes/vendor.routes.js";
import branchRoutes from "./routes/branch.routes.js";
import locationRoutes from "./routes/location.routes.js";
import assetRoutes from "./routes/asset.routes.js";
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
app.use("/api/v1/admin", adminRoutes);

// ✅ Commit 5: Master data modules
app.use("/api/v1/asset-categories", assetCategoryRoutes);
app.use("/api/v1/vendors", vendorRoutes);
app.use("/api/v1/branches", branchRoutes);
app.use("/api/v1/locations", locationRoutes);
app.use("/api/v1/assets", assetRoutes);

// ✅ Error handler should always be last
app.use(errorHandler);

export default app;