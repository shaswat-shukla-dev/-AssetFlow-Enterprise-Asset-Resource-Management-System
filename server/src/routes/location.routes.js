import express from "express";

import {
    create,
    getOne,
    getAll,
    update,
    remove
} from "../controllers/location.controller.js";

import {
    createLocationValidator,
    updateLocationValidator
} from "../validators/location.validator.js";

import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.post("/", authorize("ADMIN"), createLocationValidator, create);
router.get("/", getAll);
router.get("/:id", getOne);
router.put("/:id", authorize("ADMIN"), updateLocationValidator, update);
router.delete("/:id", authorize("ADMIN"), remove);

export default router;
