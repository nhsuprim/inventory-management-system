import { NextFunction, Request, Response } from "express";
import { categoryService } from "./category.services";

const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await categoryService.createCategory(req);
        res.status(200).json({
            success: true,
            message: "Category created successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await categoryService.getAllCategories();
        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getCategoryById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;
        const result = await categoryService.getCategoryById(id);
        res.status(200).json({
            success: true,
            message: "Category retrieved successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;
        const result = await categoryService.deleteCategory(id);
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const result = await categoryService.updateCategory(id, name);
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const categoryController = {
    createCategory,
    getAllCategories,
    deleteCategory,
    updateCategory,
    getCategoryById,
};
