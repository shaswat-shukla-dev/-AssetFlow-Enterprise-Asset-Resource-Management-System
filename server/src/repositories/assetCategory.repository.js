import prisma from "../config/database.js";

export const createCategory = async (data) => {

    return prisma.assetCategory.create({
        data
    });

};

export const findCategoryById = async (id) => {

    return prisma.assetCategory.findFirst({
        where: {
            id,
            deletedAt: null
        },
        include: {
            parent: true,
            children: true
        }
    });

};

export const findCategoryByCode = async (code) => {

    return prisma.assetCategory.findFirst({
        where: {
            code,
            deletedAt: null
        }
    });

};

export const findAllCategories = async ({ skip, take, search, status }) => {

    const where = {
        deletedAt: null,
        ...(status ? { status } : {}),
        ...(search
            ? {
                OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { code: { contains: search, mode: "insensitive" } }
                ]
            }
            : {})
    };

    const [data, total] = await Promise.all([
        prisma.assetCategory.findMany({
            where,
            skip,
            take,
            orderBy: { createdAt: "desc" },
            include: {
                parent: true
            }
        }),
        prisma.assetCategory.count({ where })
    ]);

    return { data, total };

};

export const updateCategoryById = async (id, data) => {

    return prisma.assetCategory.update({
        where: { id },
        data
    });

};

export const softDeleteCategoryById = async (id) => {

    return prisma.assetCategory.update({
        where: { id },
        data: {
            deletedAt: new Date(),
            status: "INACTIVE"
        }
    });

};
