import {
    createCategory,
    findCategoryById,
    findCategoryByCode,
    findAllCategories,
    updateCategoryById,
    softDeleteCategoryById
} from "../repositories/assetCategory.repository.js";

export const createAssetCategory = async (payload) => {

    const existing = await findCategoryByCode(payload.code);

    if (existing) {
        throw new Error("Category code already exists");
    }

    if (payload.parentId) {

        const parent = await findCategoryById(payload.parentId);

        if (!parent) {
            throw new Error("Parent category not found");
        }

    }

    return createCategory({
        name: payload.name,
        code: payload.code,
        description: payload.description,
        parentId: payload.parentId || null
    });

};

export const getAssetCategoryById = async (id) => {

    const category = await findCategoryById(id);

    if (!category) {
        throw new Error("Category not found");
    }

    return category;

};

export const listAssetCategories = async (query) => {

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const { data, total } = await findAllCategories({
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

export const updateAssetCategory = async (id, payload) => {

    const category = await findCategoryById(id);

    if (!category) {
        throw new Error("Category not found");
    }

    if (payload.code && payload.code !== category.code) {

        const existing = await findCategoryByCode(payload.code);

        if (existing) {
            throw new Error("Category code already exists");
        }

    }

    if (payload.parentId === id) {
        throw new Error("Category cannot be its own parent");
    }

    return updateCategoryById(id, {
        name: payload.name ?? category.name,
        code: payload.code ?? category.code,
        description: payload.description ?? category.description,
        parentId: payload.parentId ?? category.parentId,
        status: payload.status ?? category.status
    });

};

export const deleteAssetCategory = async (id) => {

    const category = await findCategoryById(id);

    if (!category) {
        throw new Error("Category not found");
    }

    return softDeleteCategoryById(id);

};
