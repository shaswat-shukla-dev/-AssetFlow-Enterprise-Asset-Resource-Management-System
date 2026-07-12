import express from "express";

import {
    create,
    getOne,
    getAll,
    update,
    remove
} from "../controllers/branch.controller.js";

import {
    createBranchValidator,
    updateBranchValidator
} from "../validators/branch.validator.js";

import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.post(
    "/",
    authorize("ADMIN"),
    createBranchValidator,
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
    updateBranchValidator,
    update
);

router.delete(
    "/:id",
    authorize("ADMIN"),
    remove
);

export default router;
