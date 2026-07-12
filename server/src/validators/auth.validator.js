import { body } from "express-validator";

export const registerValidator = [

    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required"),

    body("email")
        .isEmail()
        .withMessage("Valid email is required"),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),

    body("employeeId")
        .notEmpty()
        .withMessage("Employee Id is required"),

    body("roleId")
        .notEmpty()
        .withMessage("Role Id is required")

];