import { NextFunction, Request, Response } from "express";
import { sizeService } from "./size.services";

const createSize = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const size = await sizeService.createSize(req);
        res.status(201).json({
            success: true,
            message: "Size created successfully",
            data: size,
        });
    } catch (error) {
        next(error);
    }
};

const updateSize = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const size = await sizeService.updateSize(req);
        res.status(200).json({
            success: true,
            message: "Size updated successfully",
            data: size,
        });
    } catch (error) {
        next(error);
    }
};

const updateStock = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const size = await sizeService.updateStock(req);
        res.status(200).json({
            success: true,
            message: "Stock updated successfully",
            data: size,
        });
    } catch (error) {
        next(error);
    }
};

const deleteSize = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const size = await sizeService.deleteSize(req);
        res.status(200).json({
            success: true,
            message: "Size deleted successfully",
            data: size,
        });
    } catch (error) {
        next(error);
    }
};

export const sizeControllers = {
    createSize,
    updateSize,
    updateStock,
    deleteSize,
};
