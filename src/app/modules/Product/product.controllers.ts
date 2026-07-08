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

export const productControllers = {
    addProduct,
};
