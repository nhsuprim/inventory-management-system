import { NextFunction, Request, Response } from "express";
import { customerServices } from "./customer.services";

const createCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await customerServices.createCustomer(req);
        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getAllCustomers = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await customerServices.getAllCustomers(req);
        res.status(200).json({
            success: true,
            message: "Customers retrieved successfully",
            ...result,
        });
    } catch (error) {
        next(error);
    }
};

const getSingleCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await customerServices.getSingleCustomer(req.params.id);
        res.status(200).json({
            success: true,
            message: "Customer retrieved successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const updateCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await customerServices.updateCustomer(
            req.params.id,
            req.body,
        );
        res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const deleteCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await customerServices.deleteCustomer(req.params.id);
        res.status(200).json({
            success: true,
            message: "Customer deleted successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const customerControllers = {
    createCustomer,
    getAllCustomers,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer,
};
