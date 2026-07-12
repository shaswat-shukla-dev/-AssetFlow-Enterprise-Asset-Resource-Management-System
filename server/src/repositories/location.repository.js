import prisma from "../config/database.js";

export const createLocation = async (data) => {

    return prisma.location.create({
        data
    });

};

export const findLocationById = async (id) => {

    return prisma.location.findFirst({
        where: {
            id,
            deletedAt: null
        },
        include: {
            branch: true
        }
    });

};

export const findAllLocations = async ({ skip, take, search, status, branchId }) => {

    const where = {
        deletedAt: null,
        ...(status ? { status } : {}),
        ...(branchId ? { branchId } : {}),
        ...(search
            ? {
                OR: [
                    { building: { contains: search, mode: "insensitive" } },
                    { room: { contains: search, mode: "insensitive" } }
                ]
            }
            : {})
    };

    const [data, total] = await Promise.all([
        prisma.location.findMany({
            where,
            skip,
            take,
            orderBy: { createdAt: "desc" },
            include: { branch: true }
        }),
        prisma.location.count({ where })
    ]);

    return { data, total };

};

export const updateLocationById = async (id, data) => {

    return prisma.location.update({
        where: { id },
        data
    });

};

export const softDeleteLocationById = async (id) => {

    return prisma.location.update({
        where: { id },
        data: {
            deletedAt: new Date(),
            status: "INACTIVE"
        }
    });

};
