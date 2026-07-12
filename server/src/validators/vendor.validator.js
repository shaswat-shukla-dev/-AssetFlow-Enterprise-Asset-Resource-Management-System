import { body } from "express-validator";

export const createVendorValidator = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Vendor name is required"),

    body("code")
        .trim()
        .notEmpty()
        .withMessage("Vendor code is required"),

    body("email")
        .optional({ nullable: true })
        .isEmail()
        .withMessage("Valid email is required"),

    body("phone")
        .optional({ nullable: true })
        .isMobilePhone("any")
        .withMessage("Valid phone number is required"),

    body("gstNumber")
        .optional({ nullable: true })
        .isString()
        .withMessage("GST number must be a valid string")

];

export const updateVendorValidator = [

    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Vendor name cannot be empty"),

    body("code")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Vendor code cannot be empty"),

    body("email")
        .optional({ nullable: true })
        .isEmail()
        .withMessage("Valid email is required"),

    body("status")
        .optional()
        .isIn(["ACTIVE", "INACTIVE"])
        .withMessage("Status must be ACTIVE or INACTIVE")

];
