import { validationResult } from "express-validator";

import { registerUser } from "../services/auth.service.js";
import { loginUser } from "../services/auth.service.js";

import {
    successResponse,
    errorResponse
} from "../utils/response.js";

export const register = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return errorResponse(
            res,
            "Validation Failed",
            400,
            errors.array()
        );

    }

    try {

        const user = await registerUser(req.body);

        return successResponse(
            res,
            "User Registered Successfully",
            user,
            201
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message,
            400
        );

    }

};
export const login = async (req, res) => {

    try {

        const data = await loginUser(req.body);

        return successResponse(
            res,
            "Login Successful",
            data
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message,
            401
        );

    }

};
export const profile = async (req,res)=>{

    return successResponse(
        res,
        "Profile fetched successfully",
        req.user
    );

};