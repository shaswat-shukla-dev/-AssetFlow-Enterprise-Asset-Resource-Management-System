import { body } from "express-validator";

export const createCategoryValidator = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required"),

    body("code")
        .trim()
        .notEmpty()
        .withMessage("Category code is required"),

    body("parentId")
        .optional({ nullable: true })
        .isString()
        .withMessage("Parent Id must be a valid string")

];

export const updateCategoryValidator = [

    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Category name cannot be empty"),

    body("code")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Category code cannot be empty"),

    body("status")
        .optional()
        .isIn(["ACTIVE", "INACTIVE"])
        .withMessage("Status must be ACTIVE or INACTIVE")

];
