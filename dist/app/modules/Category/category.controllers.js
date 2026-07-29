"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const category_services_1 = require("./category.services");
const createCategory = async (req, res, next) => {
    try {
        const result = await category_services_1.categoryService.createCategory(req);
        res.status(200).json({
            success: true,
            message: "Category created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getAllCategories = async (req, res, next) => {
    try {
        const result = await category_services_1.categoryService.getAllCategories();
        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await category_services_1.categoryService.getCategoryById(id);
        res.status(200).json({
            success: true,
            message: "Category retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await category_services_1.categoryService.deleteCategory(id);
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const result = await category_services_1.categoryService.updateCategory(id, name);
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.categoryController = {
    createCategory,
    getAllCategories,
    deleteCategory,
    updateCategory,
    getCategoryById,
};
