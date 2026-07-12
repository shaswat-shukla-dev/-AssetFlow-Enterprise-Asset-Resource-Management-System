import { validationResult } from "express-validator";

import {
    createNewVendor,
    getVendorById,
    listVendors,
    updateVendor,
    deleteVendor
} from "../services/vendor.service.js";

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

        const vendor = await createNewVendor(req.body);

        return successResponse(
            res,
            "Vendor Created Successfully",
            vendor,
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

        const vendor = await getVendorById(req.params.id);

        return successResponse(
            res,
            "Vendor Fetched Successfully",
            vendor
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

        const result = await listVendors(req.query);

        return successResponse(
            res,
            "Vendors Fetched Successfully",
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

        const vendor = await updateVendor(req.params.id, req.body);

        return successResponse(
            res,
            "Vendor Updated Successfully",
            vendor
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

        await deleteVendor(req.params.id);

        return successResponse(
            res,
            "Vendor Deleted Successfully",
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
