import { validationResult } from "express-validator";

import {
    createAssetCategory,
    getAssetCategoryById,
    listAssetCategories,
    updateAssetCategory,
    deleteAssetCategory
} from "../services/assetCategory.service.js";

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

        const category = await createAssetCategory(req.body);

        return successResponse(
            res,
            "Asset Category Created Successfully",
            category,
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

        const category = await getAssetCategoryById(req.params.id);

        return successResponse(
            res,
            "Asset Category Fetched Successfully",
            category
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

        const result = await listAssetCategories(req.query);

        return successResponse(
            res,
            "Asset Categories Fetched Successfully",
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

        const category = await updateAssetCategory(req.params.id, req.body);

        return successResponse(
            res,
            "Asset Category Updated Successfully",
            category
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

        await deleteAssetCategory(req.params.id);

        return successResponse(
            res,
            "Asset Category Deleted Successfully",
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
