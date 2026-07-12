import { body } from "express-validator";

export const createLocationValidator = [

    body("branchId")
        .trim()
        .notEmpty()
        .withMessage("Branch Id is required")

];

export const updateLocationValidator = [

    body("status")
        .optional()
        .isIn(["ACTIVE", "INACTIVE"])
        .withMessage("Status must be ACTIVE or INACTIVE")

];
