import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.services";
import httpStatus from "http-status";

const deleteCaptain = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        const result = await adminService.deleteCaptain(id);

        res.status(200).json({
            success: true,
            message: "Captain deleted successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deletePlayer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        const result = await adminService.deletePlayer(id);

        res.status(200).json({
            success: true,
            message: "Player deleted successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const result = await adminService.deleteTeam(id);

        res.status(200).json({
            success: true,
            message: "Team deleted successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const confirmPlayer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;

        const result = await adminService.confirmPlayer(id);

        return res.status(httpStatus.OK).json({
            success: true,
            message: "Player confirmed successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const requestPlayer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await adminService.requestPlayer();

        return res.status(httpStatus.OK).json({
            success: true,
            message: "Player fetched successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const createSuperAdmin = async (req: Request, res: Response) => {
    try {
        const result = await adminService.createSuperAdmin(req.body);
        res.status(200).json({
            success: true,
            message: "Super admin created successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const adminController = {
    deleteCaptain,
    deletePlayer,
    confirmPlayer,
    deleteTeam,
    createSuperAdmin,
    requestPlayer,
};
