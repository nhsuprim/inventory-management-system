import { NextFunction, Request, Response } from "express";
import { productServices } from "./product.services";

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productServices.addProducts(req);
        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: product,
        });
    } catch (error) {
        next(error); // Forward the error to error-handling middleware
    }
};

const getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const product = await productServices.getProductById(req);
        res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            data: product,
        });
    } catch (error) {
        next(error); // Forward the error to error-handling middleware
    }
};

const getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const products = await productServices.getAllProducts();
        res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: products,
        });
    } catch (error) {
        next(error); // Forward the error to error-handling middleware
    }
};

const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const updatedProduct = await productServices.updateProduct(req);
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        next(error); // Forward the error to error-handling middleware
    }
};

export const productControllers = {
    addProduct,
    getAllProducts,
    updateProduct,
    getProductById,
};
