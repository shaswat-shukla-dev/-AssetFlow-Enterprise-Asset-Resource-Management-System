import prisma from "../config/database.js";

import {
    createBranch,
    findBranchById,
    findBranchByCode,
    findAllBranches,
    updateBranchById,
    softDeleteBranchById
} from "../repositories/branch.repository.js";

export const createNewBranch = async (payload) => {

    const existing = await findBranchByCode(payload.code);

    if (existing) {
        throw new Error("Branch code already exists");
    }

    const organization = await prisma.organization.findUnique({
        where: { id: payload.organizationId }
    });

    if (!organization) {
        throw new Error("Organization not found");
    }

    return createBranch({
        name: payload.name,
        code: payload.code,
        address: payload.address,
        city: payload.city,
        state: payload.state,
        country: payload.country,
        pincode: payload.pincode,
        organizationId: payload.organizationId
    });

};

export const getBranchById = async (id) => {

    const branch = await findBranchById(id);

    if (!branch) {
        throw new Error("Branch not found");
    }

    return branch;

};

export const listBranches = async (query) => {

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const { data, total } = await findAllBranches({
        skip,
        take: limit,
        search: query.search,
        status: query.status,
        organizationId: query.organizationId
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

export const updateBranch = async (id, payload) => {

    const branch = await findBranchById(id);

    if (!branch) {
        throw new Error("Branch not found");
    }

    if (payload.code && payload.code !== branch.code) {

        const existing = await findBranchByCode(payload.code);

        if (existing) {
            throw new Error("Branch code already exists");
        }

    }

    return updateBranchById(id, {
        name: payload.name ?? branch.name,
        code: payload.code ?? branch.code,
        address: payload.address ?? branch.address,
        city: payload.city ?? branch.city,
        state: payload.state ?? branch.state,
        country: payload.country ?? branch.country,
        pincode: payload.pincode ?? branch.pincode,
        status: payload.status ?? branch.status
    });

};

export const deleteBranch = async (id) => {

    const branch = await findBranchById(id);

    if (!branch) {
        throw new Error("Branch not found");
    }

    return softDeleteBranchById(id);

};
