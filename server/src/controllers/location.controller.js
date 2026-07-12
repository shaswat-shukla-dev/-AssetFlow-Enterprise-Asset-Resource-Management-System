import { validationResult } from "express-validator";

import {
    createNewLocation,
    getLocationById,
    listLocations,
    updateLocation,
    deleteLocation
} from "../services/location.service.js";

import { successResponse, errorResponse } from "../utils/response.js";

export const create = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return errorResponse(res, "Validation Failed", 400, errors.array());
    }

    try {

        const location = await createNewLocation(req.body);
        return successResponse(res, "Location Created Successfully", location, 201);

    } catch (error) {
        return errorResponse(res, error.message, 400);
    }

};

export const getOne = async (req, res) => {

    try {

        const location = await getLocationById(req.params.id);
        return successResponse(res, "Location Fetched Successfully", location);

    } catch (error) {
        return errorResponse(res, error.message, 404);
    }

};

export const getAll = async (req, res) => {

    try {

        const result = await listLocations(req.query);
        return successResponse(res, "Locations Fetched Successfully", result);

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

        const location = await updateLocation(req.params.id, req.body);
        return successResponse(res, "Location Updated Successfully", location);

    } catch (error) {
        return errorResponse(res, error.message, 400);
    }

};

export const remove = async (req, res) => {

    try {

        await deleteLocation(req.params.id);
        return successResponse(res, "Location Deleted Successfully", {});

    } catch (error) {
        return errorResponse(res, error.message, 400);
    }

};
