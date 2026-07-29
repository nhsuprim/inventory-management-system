"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../erros/ApiError"));
const createCategory = async (req) => {
    if (!req.body.name) {
        throw new ApiError_1.default(400, "Category name is required");
    }
    const name = req.body.name.trim();
    const allCategories = await prisma_1.default.category.findMany({
        select: { id: true, name: true },
    });
    const isExist = allCategories.find((cat) => cat.name.toLowerCase() === name.toLowerCase());
    if (isExist) {
        throw new ApiError_1.default(400, "Category already exists");
    }
    const parentCategory = allCategories.find((cat) => cat.id === req.body.parentCategoryId);
    if (req.body.parentCategoryId && !parentCategory) {
        throw new ApiError_1.default(400, "Parent category not found");
    }
    const category = await prisma_1.default.category.create({
        data: {
            name: req.body.name,
            parentCategoryId: req.body.parentCategoryId || null,
        },
    });
    return category;
};
const getAllCategories = async () => {
    const categories = await prisma_1.default.category.findMany({
        where: {
            parentCategoryId: null,
        },
        select: {
            id: true,
            name: true,
            subCategories: {
                select: {
                    id: true,
                    name: true,
                },
            },
            _count: { select: { products: true } },
        },
    });
    return categories;
};
const getCategoryById = async (id) => {
    const category = await prisma_1.default.category.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            subCategories: {
                select: {
                    id: true,
                    name: true,
                },
            },
            _count: { select: { products: true } },
        },
    });
    return category;
};
//delete category or subcategory
const deleteCategory = async (id) => {
    const category = await prisma_1.default.category.findUnique({
        where: { id },
    });
    if (!category) {
        throw new ApiError_1.default(404, "Category not found");
    }
    const hasSubCategory = await prisma_1.default.category.findFirst({
        where: {
            parentCategoryId: id,
        },
    });
    if (hasSubCategory) {
        throw new ApiError_1.default(400, "Cannot delete category because it has subcategories. Delete the subcategories first.");
    }
    const productCount = await prisma_1.default.product.count({
        where: { categoryId: id },
    });
    if (productCount > 0) {
        throw new ApiError_1.default(400, `Cannot delete: ${productCount} product(s) still belong to this category. Reassign them first.`);
    }
    await prisma_1.default.category.delete({
        where: { id },
    });
    return category;
};
//update
const updateCategory = async (id, name) => {
    const category = await prisma_1.default.category.findUnique({
        where: { id },
    });
    if (!category) {
        throw new ApiError_1.default(404, "Category not found");
    }
    const allCategories = await prisma_1.default.category.findMany({
        select: { id: true, name: true },
    });
    const isDuplicate = allCategories.find((cat) => cat.id !== id && cat.name.toLowerCase() === name.toLowerCase());
    if (isDuplicate) {
        throw new ApiError_1.default(400, "Category already exists");
    }
    const updatedCategory = await prisma_1.default.category.update({
        where: { id },
        data: { name },
    });
    return updatedCategory;
};
exports.categoryService = {
    createCategory,
    getAllCategories,
    deleteCategory,
    updateCategory,
    getCategoryById,
};
