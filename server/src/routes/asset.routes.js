import express from "express";

import {
    create,
    getOne,
    getAll,
    update,
    remove
} from "../controllers/asset.controller.js";

import {
    createAssetValidator,
    updateAssetValidator
} from "../validators/asset.validator.js";

import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.post("/", authorize("ADMIN"), createAssetValidator, create);
router.get("/", getAll);
router.get("/:id", getOne);
router.put("/:id", authorize("ADMIN"), updateAssetValidator, update);
router.delete("/:id", authorize("ADMIN"), remove);

export default router;
