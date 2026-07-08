import httpStatus from "http-status";
import { playerServices } from "./player.services";
import { NextFunction, Request, Response } from "express";

const getAllPlayers = async (res: Response) => {
    const result = await playerServices.getAllPlayers();
    res.status(httpStatus.OK).json({
        success: true,
        message: "All player fetched successfully",
        data: result,
    });
};

const getAllRequest = async (res: Response) => {
    const result = await playerServices.getAllRequest();
    res.status(httpStatus.OK).json({
        success: true,
        message: "All player fetched successfully",
        data: result,
    });
};

const getPlayerById = async (
    res: Response,
    req: Request,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        const result = await playerServices.getPlayerById(id);

        res.status(httpStatus.OK).json({
            success: true,
            message: "player fetched successfully",
            data: result,
        });
    } catch (error: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};

const soldPlayer = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const result = await playerServices.soldPlayer(id, data);

        return res.status(httpStatus.OK).json({
            success: true,
            message: "Player updated successfully",
            data: result,
        });
    } catch (error: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};

const removeTeamPlayer = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await playerServices.removeTeamPlayer(id);
        return res.status(httpStatus.OK).json({
            success: true,
            message: "Player removed from team successfully",
            data: result,
        });
    } catch (error: any) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};

export const playerControllers = {
    getAllPlayers,
    soldPlayer,
    getPlayerById,
    removeTeamPlayer,
    getAllRequest,
};
