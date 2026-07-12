import { body } from "express-validator";

export const createBranchValidator = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Branch name is required"),

    body("code")
        .trim()
        .notEmpty()
        .withMessage("Branch code is required"),

    body("organizationId")
        .trim()
        .notEmpty()
        .withMessage("Organization Id is required")

];

export const updateBranchValidator = [

    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Branch name cannot be empty"),

    body("code")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Branch code cannot be empty"),

    body("status")
        .optional()
        .isIn(["ACTIVE", "INACTIVE"])
        .withMessage("Status must be ACTIVE or INACTIVE")

];
