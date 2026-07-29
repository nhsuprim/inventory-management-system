"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productControllers = void 0;
const product_services_1 = require("./product.services");
const addProduct = async (req, res, next) => {
    try {
        const product = await product_services_1.productServices.addProducts(req);
        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: product,
        });
    }
    catch (error) {
        next(error); // Forward the error to error-handling middleware
    }
};
const getProductById = async (req, res, next) => {
    try {
        const product = await product_services_1.productServices.getProductById(req);
        res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            data: product,
        });
    }
    catch (error) {
        next(error); // Forward the error to error-handling middleware
    }
};
const getAllProducts = async (req, res, next) => {
    try {
        const products = await product_services_1.productServices.getAllProducts();
        res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: products,
        });
    }
    catch (error) {
        next(error); // Forward the error to error-handling middleware
    }
};
const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await product_services_1.productServices.updateProduct(req);
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    }
    catch (error) {
        next(error); // Forward the error to error-handling middleware
    }
};
exports.productControllers = {
    addProduct,
    getAllProducts,
    updateProduct,
    getProductById,
};
