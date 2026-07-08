import { NextFunction, Request, Response } from "express";
import { IAuthUser } from "../../interface/user";

import httpStatus from "http-status";
import { captainServices } from "./captain.services";

const createTeam = async (
    req: Request & { user?: IAuthUser },
    res: Response,
    next: NextFunction
) => {
    const user = req.user;
    const result = await captainServices.createTeam(user, req);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Team inserted successfully",
        data: result,
    });
};

const getAllCaptains = async (res: Response) => {
    const result = await captainServices.getAllCaptains();
    res.status(httpStatus.OK).json({
        success: true,
        message: "All captain fetched successfully",
        data: result,
    });
};

export const captainControllers = {
    createTeam,
    getAllCaptains,
};
