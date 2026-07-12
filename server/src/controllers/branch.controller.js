import { validationResult } from "express-validator";

import {
    createNewBranch,
    getBranchById,
    listBranches,
    updateBranch,
    deleteBranch
} from "../services/branch.service.js";

import {
    successResponse,
    errorResponse
} from "../utils/response.js";

export const create = async (req, res) => {

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

        const branch = await createNewBranch(req.body);

        return successResponse(
            res,
            "Branch Created Successfully",
            branch,
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

export const getOne = async (req, res) => {

    try {

        const branch = await getBranchById(req.params.id);

        return successResponse(
            res,
            "Branch Fetched Successfully",
            branch
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message,
            404
        );

    }

};

export const getAll = async (req, res) => {

    try {

        const result = await listBranches(req.query);

        return successResponse(
            res,
            "Branches Fetched Successfully",
            result
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message,
            400
        );

    }

};

export const update = async (req, res) => {

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

        const branch = await updateBranch(req.params.id, req.body);

        return successResponse(
            res,
            "Branch Updated Successfully",
            branch
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message,
            400
        );

    }

};

export const remove = async (req, res) => {

    try {

        await deleteBranch(req.params.id);

        return successResponse(
            res,
            "Branch Deleted Successfully",
            {}
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message,
            400
        );

    }

};
