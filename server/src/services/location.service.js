import prisma from "../config/database.js";

import {
    createLocation,
    findLocationById,
    findAllLocations,
    updateLocationById,
    softDeleteLocationById
} from "../repositories/location.repository.js";

export const createNewLocation = async (payload) => {

    const branch = await prisma.branch.findUnique({
        where: { id: payload.branchId }
    });

    if (!branch) {
        throw new Error("Branch not found");
    }

    return createLocation({
        branchId: payload.branchId,
        building: payload.building,
        floor: payload.floor,
        room: payload.room,
        rack: payload.rack,
        shelf: payload.shelf
    });

};

export const getLocationById = async (id) => {

    const location = await findLocationById(id);

    if (!location) {
        throw new Error("Location not found");
    }

    return location;

};

export const listLocations = async (query) => {

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const { data, total } = await findAllLocations({
        skip,
        take: limit,
        search: query.search,
        status: query.status,
        branchId: query.branchId
    });

    return {
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };

};

export const updateLocation = async (id, payload) => {

    const location = await findLocationById(id);

    if (!location) {
        throw new Error("Location not found");
    }

    return updateLocationById(id, {
        building: payload.building ?? location.building,
        floor: payload.floor ?? location.floor,
        room: payload.room ?? location.room,
        rack: payload.rack ?? location.rack,
        shelf: payload.shelf ?? location.shelf,
        status: payload.status ?? location.status
    });

};

export const deleteLocation = async (id) => {

    const location = await findLocationById(id);

    if (!location) {
        throw new Error("Location not found");
    }

    return softDeleteLocationById(id);

};
