import { Request, Response } from "express";
import prisma from "../../shared/prisma";
import ApiError from "../../erros/ApiError";

const createCategory = async (req: Request) => {
    if (!req.body.name) {
        throw new ApiError(400, "Category name is required");
    }

    const name = req.body.name.trim();

    const allCategories = await prisma.category.findMany({
        select: { id: true, name: true },
    });

    const isExist = allCategories.find(
        (cat) => cat.name.toLowerCase() === name.toLowerCase(),
    );

    if (isExist) {
        throw new ApiError(400, "Category already exists");
    }

    const parentCategory = allCategories.find(
        (cat) => cat.id === req.body.parentCategoryId,
    );

    if (req.body.parentCategoryId && !parentCategory) {
        throw new ApiError(400, "Parent category not found");
    }

    const category = await prisma.category.create({
        data: {
            name: req.body.name,
            parentCategoryId: req.body.parentCategoryId || null,
        },
    });

    return category;
};

const getAllCategories = async () => {
    const categories = await prisma.category.findMany({
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

const getCategoryById = async (id: string) => {
    const category = await prisma.category.findUnique({
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
const deleteCategory = async (id: string) => {
    const category = await prisma.category.findUnique({
        where: { id },
    });

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    const hasSubCategory = await prisma.category.findFirst({
        where: {
            parentCategoryId: id,
        },
    });

    if (hasSubCategory) {
        throw new ApiError(
            400,
            "Cannot delete category because it has subcategories. Delete the subcategories first.",
        );
    }

    const productCount = await prisma.product.count({
        where: { categoryId: id },
    });

    if (productCount > 0) {
        throw new ApiError(
            400,
            `Cannot delete: ${productCount} product(s) still belong to this category. Reassign them first.`,
        );
    }

    await prisma.category.delete({
        where: { id },
    });

    return category;
};

//update
const updateCategory = async (id: string, name: string) => {
    const category = await prisma.category.findUnique({
        where: { id },
    });

    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    const allCategories = await prisma.category.findMany({
        select: { id: true, name: true },
    });

    const isDuplicate = allCategories.find(
        (cat) => cat.id !== id && cat.name.toLowerCase() === name.toLowerCase(),
    );
    if (isDuplicate) {
        throw new ApiError(400, "Category already exists");
    }

    const updatedCategory = await prisma.category.update({
        where: { id },
        data: { name },
    });

    return updatedCategory;
};

export const categoryService = {
    createCategory,
    getAllCategories,
    deleteCategory,
    updateCategory,
    getCategoryById,
};
