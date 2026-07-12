import {
    createVendor,
    findVendorById,
    findVendorByCode,
    findAllVendors,
    updateVendorById,
    softDeleteVendorById
} from "../repositories/vendor.repository.js";

export const createNewVendor = async (payload) => {

    const existing = await findVendorByCode(payload.code);

    if (existing) {
        throw new Error("Vendor code already exists");
    }

    return createVendor({
        name: payload.name,
        code: payload.code,
        contactPerson: payload.contactPerson,
        email: payload.email,
        phone: payload.phone,
        address: payload.address,
        gstNumber: payload.gstNumber
    });

};

export const getVendorById = async (id) => {

    const vendor = await findVendorById(id);

    if (!vendor) {
        throw new Error("Vendor not found");
    }

    return vendor;

};

export const listVendors = async (query) => {

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const { data, total } = await findAllVendors({
        skip,
        take: limit,
        search: query.search,
        status: query.status
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

export const updateVendor = async (id, payload) => {

    const vendor = await findVendorById(id);

    if (!vendor) {
        throw new Error("Vendor not found");
    }

    if (payload.code && payload.code !== vendor.code) {

        const existing = await findVendorByCode(payload.code);

        if (existing) {
            throw new Error("Vendor code already exists");
        }

    }

    return updateVendorById(id, {
        name: payload.name ?? vendor.name,
        code: payload.code ?? vendor.code,
        contactPerson: payload.contactPerson ?? vendor.contactPerson,
        email: payload.email ?? vendor.email,
        phone: payload.phone ?? vendor.phone,
        address: payload.address ?? vendor.address,
        gstNumber: payload.gstNumber ?? vendor.gstNumber,
        status: payload.status ?? vendor.status
    });

};

export const deleteVendor = async (id) => {

    const vendor = await findVendorById(id);

    if (!vendor) {
        throw new Error("Vendor not found");
    }

    return softDeleteVendorById(id);

};
