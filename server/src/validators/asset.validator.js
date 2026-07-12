import { body } from "express-validator";

export const createAssetValidator = [

    body("assetNumber")
        .trim()
        .notEmpty()
        .withMessage("Asset number is required"),

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Asset name is required"),

    body("categoryId")
        .trim()
        .notEmpty()
        .withMessage("Category Id is required"),

    body("purchaseCost")
        .optional({ nullable: true })
        .isFloat({ min: 0 })
        .withMessage("Purchase cost must be a positive number"),

    body("purchaseDate")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage("Purchase date must be a valid date"),

    body("warrantyExpiry")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage("Warranty expiry must be a valid date")

];

export const updateAssetValidator = [

    body("assetNumber")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Asset number cannot be empty"),

    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Asset name cannot be empty"),

    body("status")
        .optional()
        .isIn(["AVAILABLE", "ALLOCATED", "UNDER_MAINTENANCE", "RETIRED", "LOST"])
        .withMessage("Invalid asset status"),

    body("purchaseCost")
        .optional({ nullable: true })
        .isFloat({ min: 0 })
        .withMessage("Purchase cost must be a positive number")

];
