import prisma from "../config/database.js";

export const createAsset = async (data) => {

    return prisma.asset.create({
        data
    });

};

export const findAssetById = async (id) => {

    return prisma.asset.findFirst({
        where: {
            id,
            deletedAt: null
        },
        include: {
            category: true,
            vendor: true,
            branch: true,
            location: true,
            history: {
                orderBy: { createdAt: "desc" }
            }
        }
    });

};

export const findAssetByNumber = async (assetNumber) => {

    return prisma.asset.findFirst({
        where: {
            assetNumber,
            deletedAt: null
        }
    });

};

export const findAllAssets = async ({ skip, take, search, status, categoryId, branchId, vendorId }) => {

    const where = {
        deletedAt: null,
        ...(status ? { status } : {}),
        ...(categoryId ? { categoryId } : {}),
        ...(branchId ? { branchId } : {}),
        ...(vendorId ? { vendorId } : {}),
        ...(search
            ? {
                OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { assetNumber: { contains: search, mode: "insensitive" } },
                    { serialNumber: { contains: search, mode: "insensitive" } }
                ]
            }
            : {})
    };

    const [data, total] = await Promise.all([
        prisma.asset.findMany({
            where,
            skip,
            take,
            orderBy: { createdAt: "desc" },
            include: {
                category: true,
                vendor: true,
                branch: true,
                location: true
            }
        }),
        prisma.asset.count({ where })
    ]);

    return { data, total };

};

export const updateAssetById = async (id, data) => {

    return prisma.asset.update({
        where: { id },
        data
    });

};

export const softDeleteAssetById = async (id) => {

    return prisma.asset.update({
        where: { id },
        data: {
            deletedAt: new Date(),
            status: "RETIRED"
        }
    });

};

export const addAssetHistory = async ({ assetId, action, remarks, performedBy }) => {

    return prisma.assetHistory.create({
        data: {
            assetId,
            action,
            remarks,
            performedBy
        }
    });

};
