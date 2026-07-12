import express from "express";

import { register, login, profile } from "../controllers/auth.controller.js";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
    "/register",
    registerValidator,
    register
);

router.post(
    "/login",
    loginValidator,
    login
);

router.get(
    "/profile",
    authenticate,
    profile
);

export default router;
