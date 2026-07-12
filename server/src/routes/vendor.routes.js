import express from "express";

import {
    create,
    getOne,
    getAll,
    update,
    remove
} from "../controllers/vendor.controller.js";

import {
    createVendorValidator,
    updateVendorValidator
} from "../validators/vendor.validator.js";

import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.post(
    "/",
    authorize("ADMIN"),
    createVendorValidator,
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
    updateVendorValidator,
    update
);

router.delete(
    "/:id",
    authorize("ADMIN"),
    remove
);

export default router;
