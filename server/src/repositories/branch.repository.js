import prisma from "../config/database.js";

export const createBranch = async (data) => {

    return prisma.branch.create({
        data
    });

};

export const findBranchById = async (id) => {

    return prisma.branch.findFirst({
        where: {
            id,
            deletedAt: null
        },
        include: {
            organization: true,
            locations: true
        }
    });

};

export const findBranchByCode = async (code) => {

    return prisma.branch.findFirst({
        where: {
            code,
            deletedAt: null
        }
    });

};

export const findAllBranches = async ({ skip, take, search, status, organizationId }) => {

    const where = {
        deletedAt: null,
        ...(status ? { status } : {}),
        ...(organizationId ? { organizationId } : {}),
        ...(search
            ? {
                OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { code: { contains: search, mode: "insensitive" } },
                    { city: { contains: search, mode: "insensitive" } }
                ]
            }
            : {})
    };

    const [data, total] = await Promise.all([
        prisma.branch.findMany({
            where,
            skip,
            take,
            orderBy: { createdAt: "desc" }
        }),
        prisma.branch.count({ where })
    ]);

    return { data, total };

};

export const updateBranchById = async (id, data) => {

    return prisma.branch.update({
        where: { id },
        data
    });

};

export const softDeleteBranchById = async (id) => {

    return prisma.branch.update({
        where: { id },
        data: {
            deletedAt: new Date(),
            status: "INACTIVE"
        }
    });

};
