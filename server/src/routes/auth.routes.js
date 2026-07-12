import express from "express";

import { register } from "../controllers/auth.controller.js";

import { registerValidator } from "../validators/auth.validator.js";
import { login } from "../controllers/auth.controller.js";

import { loginValidator } from "../validators/auth.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post(
    "/register",
    registerValidator,
    register
);

export default router;
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