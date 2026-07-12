import { validationResult } from "express-validator";

import {
    createNewAsset,
    getAssetById,
    listAssets,
    updateAsset,
    deleteAsset
} from "../services/asset.service.js";

import { successResponse, errorResponse } from "../utils/response.js";

export const create = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return errorResponse(res, "Validation Failed", 400, errors.array());
    }

    try {

        const asset = await createNewAsset(req.body, req.user);
        return successResponse(res, "Asset Created Successfully", asset, 201);

    } catch (error) {
        return errorResponse(res, error.message, 400);
    }

};

export const getOne = async (req, res) => {

    try {

        const asset = await getAssetById(req.params.id);
        return successResponse(res, "Asset Fetched Successfully", asset);

    } catch (error) {
        return errorResponse(res, error.message, 404);
    }

};

export const getAll = async (req, res) => {

    try {

        const result = await listAssets(req.query);
        return successResponse(res, "Assets Fetched Successfully", result);

    } catch (error) {
        return errorResponse(res, error.message, 400);
    }

};

export const update = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return errorResponse(res, "Validation Failed", 400, errors.array());
    }

    try {

        const asset = await updateAsset(req.params.id, req.body, req.user);
        return successResponse(res, "Asset Updated Successfully", asset);

    } catch (error) {
        return errorResponse(res, error.message, 400);
    }

};

export const remove = async (req, res) => {

    try {

        await deleteAsset(req.params.id, req.user);
        return successResponse(res, "Asset Deleted Successfully", {});

    } catch (error) {
        return errorResponse(res, error.message, 400);
    }

};
