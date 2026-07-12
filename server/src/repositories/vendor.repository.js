import prisma from "../config/database.js";

export const createVendor = async (data) => {

    return prisma.vendor.create({
        data
    });

};

export const findVendorById = async (id) => {

    return prisma.vendor.findFirst({
        where: {
            id,
            deletedAt: null
        }
    });

};

export const findVendorByCode = async (code) => {

    return prisma.vendor.findFirst({
        where: {
            code,
            deletedAt: null
        }
    });

};

export const findAllVendors = async ({ skip, take, search, status }) => {

    const where = {
        deletedAt: null,
        ...(status ? { status } : {}),
        ...(search
            ? {
                OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { code: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } }
                ]
            }
            : {})
    };

    const [data, total] = await Promise.all([
        prisma.vendor.findMany({
            where,
            skip,
            take,
            orderBy: { createdAt: "desc" }
        }),
        prisma.vendor.count({ where })
    ]);

    return { data, total };

};

export const updateVendorById = async (id, data) => {

    return prisma.vendor.update({
        where: { id },
        data
    });

};

export const softDeleteVendorById = async (id) => {

    return prisma.vendor.update({
        where: { id },
        data: {
            deletedAt: new Date(),
            status: "INACTIVE"
        }
    });

};
