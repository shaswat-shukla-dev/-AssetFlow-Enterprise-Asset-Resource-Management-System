import prisma from "../config/database.js";

import {
    createAsset,
    findAssetById,
    findAssetByNumber,
    findAllAssets,
    updateAssetById,
    softDeleteAssetById,
    addAssetHistory
} from "../repositories/asset.repository.js";

const assertReferenceExists = async (model, id, label) => {

    if (!id) return;

    const record = await prisma[model].findUnique({ where: { id } });

    if (!record) {
        throw new Error(`${label} not found`);
    }

};

export const createNewAsset = async (payload, actor) => {

    const existing = await findAssetByNumber(payload.assetNumber);

    if (existing) {
        throw new Error("Asset number already exists");
    }

    await assertReferenceExists("assetCategory", payload.categoryId, "Category");
    await assertReferenceExists("vendor", payload.vendorId, "Vendor");
    await assertReferenceExists("branch", payload.branchId, "Branch");
    await assertReferenceExists("location", payload.locationId, "Location");

    const asset = await createAsset({
        assetNumber: payload.assetNumber,
        serialNumber: payload.serialNumber,
        name: payload.name,
        categoryId: payload.categoryId,
        vendorId: payload.vendorId || null,
        branchId: payload.branchId || null,
        locationId: payload.locationId || null,
        purchaseDate: payload.purchaseDate ? new Date(payload.purchaseDate) : null,
        purchaseCost: payload.purchaseCost ?? null,
        warrantyExpiry: payload.warrantyExpiry ? new Date(payload.warrantyExpiry) : null,
        depreciationRate: payload.depreciationRate ?? null,
        imageUrl: payload.imageUrl,
        documentUrl: payload.documentUrl,
        notes: payload.notes
    });

    await addAssetHistory({
        assetId: asset.id,
        action: "CREATED",
        remarks: "Asset registered",
        performedBy: actor?.id
    });

    return asset;

};

export const getAssetById = async (id) => {

    const asset = await findAssetById(id);

    if (!asset) {
        throw new Error("Asset not found");
    }

    return asset;

};

export const listAssets = async (query) => {

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const { data, total } = await findAllAssets({
        skip,
        take: limit,
        search: query.search,
        status: query.status,
        categoryId: query.categoryId,
        branchId: query.branchId,
        vendorId: query.vendorId
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

export const updateAsset = async (id, payload, actor) => {

    const asset = await findAssetById(id);

    if (!asset) {
        throw new Error("Asset not found");
    }

    if (payload.assetNumber && payload.assetNumber !== asset.assetNumber) {

        const existing = await findAssetByNumber(payload.assetNumber);

        if (existing) {
            throw new Error("Asset number already exists");
        }

    }

    await assertReferenceExists("assetCategory", payload.categoryId, "Category");
    await assertReferenceExists("vendor", payload.vendorId, "Vendor");
    await assertReferenceExists("branch", payload.branchId, "Branch");
    await assertReferenceExists("location", payload.locationId, "Location");

    const updated = await updateAssetById(id, {
        assetNumber: payload.assetNumber ?? asset.assetNumber,
        serialNumber: payload.serialNumber ?? asset.serialNumber,
        name: payload.name ?? asset.name,
        categoryId: payload.categoryId ?? asset.categoryId,
        vendorId: payload.vendorId ?? asset.vendorId,
        branchId: payload.branchId ?? asset.branchId,
        locationId: payload.locationId ?? asset.locationId,
        purchaseDate: payload.purchaseDate ? new Date(payload.purchaseDate) : asset.purchaseDate,
        purchaseCost: payload.purchaseCost ?? asset.purchaseCost,
        warrantyExpiry: payload.warrantyExpiry ? new Date(payload.warrantyExpiry) : asset.warrantyExpiry,
        depreciationRate: payload.depreciationRate ?? asset.depreciationRate,
        status: payload.status ?? asset.status,
        imageUrl: payload.imageUrl ?? asset.imageUrl,
        documentUrl: payload.documentUrl ?? asset.documentUrl,
        notes: payload.notes ?? asset.notes
    });

    await addAssetHistory({
        assetId: id,
        action: "UPDATED",
        remarks: "Asset details updated",
        performedBy: actor?.id
    });

    return updated;

};

export const deleteAsset = async (id, actor) => {

    const asset = await findAssetById(id);

    if (!asset) {
        throw new Error("Asset not found");
    }

    const result = await softDeleteAssetById(id);

    await addAssetHistory({
        assetId: id,
        action: "RETIRED",
        remarks: "Asset soft deleted / retired",
        performedBy: actor?.id
    });

    return result;

};
