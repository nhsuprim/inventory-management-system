import { NextFunction, Request, Response } from "express";
import { variantService } from "./variant.services";

const createVariant = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const variant = await variantService.createVarient(req);
        res.status(201).json({
            success: true,
            message: "Variant created successfully",
            data: variant,
        });
    } catch (error) {
        next(error);
    }
};

const getVariantsByProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const variants = await variantService.getVariantsByProduct(req);
        res.status(200).json({
            success: true,
            message: "Variants retrieved successfully",
            data: variants,
        });
    } catch (error) {
        next(error);
    }
};

const updateVariant = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const variant = await variantService.updateVariant(req);
        res.status(200).json({
            success: true,
            message: "Variant updated successfully",
            data: variant,
        });
    } catch (error) {
        next(error);
    }
};

const deleteVariant = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const variant = await variantService.deleteVariant(req);
        res.status(200).json({
            success: true,
            message: "Variant deleted successfully",
            data: variant,
        });
    } catch (error) {
        next(error);
    }
};

export const variantControllers = {
    createVariant,
    getVariantsByProduct,
    updateVariant,
    deleteVariant,
};
