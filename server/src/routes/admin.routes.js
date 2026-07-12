import express from "express";

import {
    authenticate,
    authorize
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
    "/dashboard",
    authenticate,
    authorize("ADMIN"),
    (req, res) => {

        res.json({
            success: true,
            message: "Welcome Admin",
            user: req.user
        });

    }
);

export default router;