import express from "express";

import {
    create,
    getOne,
    getAll,
    update,
    remove
} from "../controllers/assetCategory.controller.js";

import {
    createCategoryValidator,
    updateCategoryValidator
} from "../validators/assetCategory.validator.js";

import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.post(
    "/",
    authorize("ADMIN"),
    createCategoryValidator,
    create
);

router.get(
    "/",
    getAll
);

router.get(
    "/:id",
    getOne
);

router.put(
    "/:id",
    authorize("ADMIN"),
    updateCategoryValidator,
    update
);

router.delete(
    "/:id",
    authorize("ADMIN"),
    remove
);

export default router;
